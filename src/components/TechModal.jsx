import { useEffect } from 'react'
import './TechModal.css'

export default function TechModal({ tech, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!tech) return null

  const { Icon, name, color, description, projects, why } = tech

  return (
    <div className="tech-modal-backdrop" onClick={onClose}>
      <div
        className="tech-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="tech-modal-close mono" onClick={onClose} aria-label="Fechar">
          ESC / ✕
        </button>

        <div className="tech-modal-head">
          <Icon className="tech-modal-icon" style={{ color }} aria-hidden="true" />
          <div>
            <span className="label">FICHA — COMPONENTE</span>
            <h3 id="tech-modal-title" className="tech-modal-name mono">{name}</h3>
          </div>
        </div>

        <p className="tech-modal-desc">{description}</p>

        <div className="tech-modal-row">
          <span className="tech-modal-key mono">USADO EM</span>
          <div className="tech-modal-tags">
            {projects.map((p) => (
              <span className="tech-modal-tag mono" key={p}>{p}</span>
            ))}
          </div>
        </div>

        <div className="tech-modal-row">
          <span className="tech-modal-key mono">POR QUE</span>
          <p className="tech-modal-why">{why}</p>
        </div>
      </div>
    </div>
  )
}