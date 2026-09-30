import { useRef, useState, useEffect } from 'react'
import { TECHS } from '../../data/techs.js'
import TechModal from '../modals/TechModal.jsx'
import './TechRail.css'

// tempo (ms) pra esteira percorrer um conjunto completo de ícones, em piloto automático
const CYCLE_MS = 40000
// duração máxima (ms) de um toque pra ainda contar como "clique" e abrir o popup
const CLICK_MS = 300
// distância (px) a partir da qual um toque vira "arrastar"
const DRAG_THRESHOLD = 6

function Tile({ Icon, name, color, active }) {
  return (
    <div className={`rail-tile ${active ? 'rail-tile-active' : ''}`} data-tech-name={name} style={{ '--brand': color }}>
      <Icon className="rail-icon" aria-hidden="true" draggable={false} />
      <span className="rail-tile-label mono">{name}</span>
    </div>
  )
}

export default function TechRail() {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const draggingRef = useRef(false)
  const heldRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const startOffsetRef = useRef(0)
  const pressStartRef = useRef(0)
  const pressedTechRef = useRef(null)
  const hasCapturedPointerRef = useRef(false)
  const [interacting, setInteracting] = useState(false)
  const [activeTech, setActiveTech] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null);

  // duplicamos a lista pra criar o loop infinito sem salto visível
  const track = [...TECHS, ...TECHS]

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId
    let lastTime = performance.now()

    function step(now) {
      const dt = now - lastTime
      lastTime = now
      const node = trackRef.current

      if (node) {
        const halfWidth = node.scrollWidth / 2

        if (!draggingRef.current && !heldRef.current && !reduceMotion && !activeTech && halfWidth > 0) {
          offsetRef.current -= (halfWidth / CYCLE_MS) * dt
        }

        if (halfWidth > 0) {
          // envelopa o deslocamento pra manter o loop infinito, em qualquer direção
          offsetRef.current = ((offsetRef.current % halfWidth) + halfWidth) % halfWidth
          node.style.transform = `translateX(${-offsetRef.current}px)`
        }
      }

      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [activeTech]);

  function handlePointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return

    heldRef.current = true
    draggingRef.current = false
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    startOffsetRef.current = offsetRef.current
    pressStartRef.current = Date.now()
    hasCapturedPointerRef.current = false

    const tileEl = e.target.closest ? e.target.closest('.rail-tile') : null
    pressedTechRef.current = tileEl ? tileEl.dataset.techName : null

    setInteracting(true)
  }

  function handlePointerMove(e) {
    if (!heldRef.current) return

    const dx = e.clientX - startXRef.current
    const dy = e.clientY - startYRef.current
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (!draggingRef.current && (absDx > DRAG_THRESHOLD || absDy > DRAG_THRESHOLD)) {
      draggingRef.current = true

      // Se arrastou predominantemente na horizontal, captura o ponteiro para movimentar a esteira
      if (absDx >= absDy && !hasCapturedPointerRef.current) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId)
          hasCapturedPointerRef.current = true
        } catch {
          /* pointer capture não suportado ou falhou */
        }
      }
    }

    if (draggingRef.current && hasCapturedPointerRef.current) {
      offsetRef.current = startOffsetRef.current - dx
    }
  }

  function releasePointer(e) {
    if (hasCapturedPointerRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        /* pointer already released */
      }
      hasCapturedPointerRef.current = false
    }

    heldRef.current = false
    draggingRef.current = false
    setInteracting(false)
  }

  function handlePointerUp(e) {
    const wasDragging = draggingRef.current
    const duration = Date.now() - pressStartRef.current
    const targetTech = pressedTechRef.current

    releasePointer(e)

    // clique de verdade: sem arrastar (nem horizontal nem vertical) e rápido — abre o popup da tecnologia
    if (!wasDragging && duration < CLICK_MS && targetTech) {
      const index = TECHS.findIndex((t) => t.name === targetTech)
      const tech = TECHS[index]

      if (tech) {
        setActiveTech(tech)
        setActiveIndex(index)
      }
    }
    pressedTechRef.current = null
  }

  function handlePointerCancel(e) {
    // Quando o navegador assume o scroll vertical nativo (pan-y) no mobile:
    // encerra a interação e NUNCA abre o modal
    releasePointer(e)
    pressedTechRef.current = null
  }

  function handleKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ' ') && !heldRef.current) {
      e.preventDefault()
      heldRef.current = true
      setInteracting(true)
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      heldRef.current = false
      setInteracting(false)
    }
  }

  return (
    <section className="section-flush tech-rail" aria-label="Tecnologias que conheço">
      <div className="rail-frame">
        <div
          className={`rail-row ${interacting ? 'rail-row-active' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          role="button"
          tabIndex={0}
          aria-pressed={interacting}
          aria-label="Clique num ícone para saber mais sobre a tecnologia. Arraste para navegar, ou segure para pausar."
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          <div className="rail-track" ref={trackRef}>
            {track.map((t, i) => (
              <Tile 
                key={`${t.name}-${i}`}
                {...t}
                active={activeIndex === (i % TECHS.length)} 
              />
            ))}
          </div>
        </div>
      </div>

      <TechModal
        tech={activeTech}
        onClose={() => {
          setActiveTech(null)
          setActiveIndex(null)
        }}
      />
    </section>
  )
}