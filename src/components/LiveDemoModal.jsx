import { useState, useEffect, useRef } from 'react'
import './LiveDemoModal.css'

export default function LiveDemoModal({ project, initialRole = 'Admin', onClose }) {
  const [currentRole, setCurrentRole] = useState(initialRole)
  const [loading, setLoading] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [iframeSrc, setIframeSrc] = useState('')
  const [authError, setAuthError] = useState(null)
  const iframeRef = useRef(null)

  // URLs base da aplicação e da API
  const appBaseUrl = (
    project?.demoUrl ||
    import.meta.env.VITE_SUPPORT_DEMO_URL ||
    'http://localhost:5173'
  ).replace(/\/+$/, '')

  const apiBaseUrl = (
    project?.apiUrl ||
    import.meta.env.VITE_SUPPORT_API_URL ||
    'http://localhost:5227'
  ).replace(/\/+$/, '')

  // Efetua autenticação demo via API e injeta token diretamente na URL do iframe
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setAuthError(null)

    async function bootstrapDemo() {
      try {
        const response = await fetch(`${apiBaseUrl}/auth/demo-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: currentRole }),
        })

        if (!response.ok) {
          throw new Error(`Falha ao inicializar demo (HTTP ${response.status})`)
        }

        const data = await response.json()
        const token = data.token || data.accessToken

        if (!cancelled && token) {
          const targetUrl = `${appBaseUrl}/?auth_token=${encodeURIComponent(token)}`
          setIframeSrc(targetUrl)
        }
      } catch (err) {
        console.error('[LiveDemoModal] Erro ao autenticar demo:', err)
        if (!cancelled) {
          setAuthError('Não foi possível conectar ao servidor de demonstração.')
          setIframeSrc('')
          setLoading(false)
        }
      }
    }

    bootstrapDemo()

    return () => {
      cancelled = true
    }
  }, [currentRole, reloadKey, apiBaseUrl, appBaseUrl])

  // Trata tecla ESC para fechar modal e F11/fullscreen
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (fullscreen) {
          setFullscreen(false)
        } else {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, fullscreen])

  // Bloqueia rolagem do body enquanto modal estiver ativo
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden'
    return () => {
      document.documentElement.style.overflowY = ''
    }
  }, [])

  function handleRoleChange(newRole) {
    if (newRole === currentRole) return
    setCurrentRole(newRole)
  }

  function handleReload() {
    setReloadKey((prev) => prev + 1)
  }

  return (
    <div className="demo-modal-backdrop" onClick={onClose}>
      <div
        className={`demo-modal ${fullscreen ? 'demo-modal--fullscreen' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header HUD */}
        <header className="demo-modal-header">
          {/* Esquerda: Marca e status */}
          <div className="demo-modal-brand">
            <span className="demo-modal-dot" aria-hidden="true" />
            <div className="demo-modal-title-wrap">
              <span id="demo-modal-title" className="demo-modal-title mono">
                {project?.name || 'SUPPORT SUITE'}
              </span>
              <span className="demo-modal-subtag mono">TESTE AO VIVO // SANDBOX</span>
            </div>
          </div>

          {/* Centro: Seletor de Perfil / Persona */}
          <div className="demo-modal-personas">
            <span className="demo-modal-personas-label mono">PERFIL:</span>

            <button
              type="button"
              className={`demo-modal-persona-btn mono ${
                currentRole === 'Admin' ? 'demo-modal-persona-btn--active' : ''
              }`}
              onClick={() => handleRoleChange('Admin')}
              title="Entrar como Administrador (Gestão de setores, usuários, relatórios e automações)"
            >
              <span>👑</span>
              <span>Admin</span>
            </button>

            <button
              type="button"
              className={`demo-modal-persona-btn mono ${
                currentRole === 'Agent' ? 'demo-modal-persona-btn--active' : ''
              }`}
              onClick={() => handleRoleChange('Agent')}
              title="Entrar como Atendente N2 (Gestão operacional de tickets, kanban e respostas)"
            >
              <span>🎧</span>
              <span>Atendente N2</span>
            </button>

            <button
              type="button"
              className={`demo-modal-persona-btn mono ${
                currentRole === 'Customer' ? 'demo-modal-persona-btn--active' : ''
              }`}
              onClick={() => handleRoleChange('Customer')}
              title="Entrar como Cliente (Abertura e acompanhamento de chamados)"
            >
              <span>👤</span>
              <span>Cliente</span>
            </button>
          </div>

          {/* Direita: Controles de Janela */}
          <div className="demo-modal-controls">
            <button
              type="button"
              className="demo-modal-ctrl-btn mono"
              onClick={handleReload}
              title="Recarregar tela da demonstração"
            >
              <span>🔄</span>
              <span>Recarregar</span>
            </button>

            <button
              type="button"
              className="demo-modal-ctrl-btn mono"
              onClick={() => setFullscreen((prev) => !prev)}
              title={fullscreen ? 'Restaurar tamanho' : 'Maximizar'}
            >
              <span>{fullscreen ? '🗗' : '⤢'}</span>
            </button>

            <button
              type="button"
              className="demo-modal-ctrl-btn demo-modal-ctrl-btn--close mono"
              onClick={onClose}
              aria-label="Fechar"
            >
              ESC / ✕
            </button>
          </div>
        </header>

        {/* Corpo com Iframe */}
        <div className="demo-modal-body">
          {loading && (
            <div className="demo-modal-loader">
              <div className="demo-modal-spinner" />
              <div className="demo-modal-loader-text mono">
                INICIALIZANDO SANDBOX DO {project?.name || 'SISTEMA'}...
              </div>
            </div>
          )}

          {authError && !loading && (
            <div className="demo-modal-error-screen">
              <div className="demo-modal-error-icon">⚠️</div>
              <h3 className="demo-modal-error-title mono">{authError}</h3>
              <p className="demo-modal-error-desc mono">
                Certifique-se de que a API (Support.Api) está em execução em <code>{apiBaseUrl}</code>.
              </p>
              <button
                type="button"
                className="demo-modal-ctrl-btn mono"
                style={{ marginTop: '12px', padding: '8px 16px', borderColor: 'var(--bp-accent)', color: 'var(--bp-paper)' }}
                onClick={handleReload}
              >
                <span>🔄</span>
                <span>Tentar Novamente</span>
              </button>
            </div>
          )}

          {iframeSrc && (
            <iframe
              key={`${currentRole}-${reloadKey}-${iframeSrc}`}
              ref={iframeRef}
              src={iframeSrc}
              title={`Demonstração ao vivo do projeto ${project?.name || 'HELPDESK AETHER'}`}
              className="demo-modal-iframe"
              allow="clipboard-read; clipboard-write; fullscreen"
              onLoad={() => setLoading(false)}
            />
          )}
        </div>

        {/* Rodapé Informativo */}
        <footer className="demo-modal-footer">
          <div className="demo-modal-footer-sec mono">
            
          </div>
          <div className="demo-modal-footer-hint mono">
            Alterne o perfil no topo para testar fluxos entre Cliente, Atendente e Admin.
          </div>
        </footer>
      </div>
    </div>
  )
}
