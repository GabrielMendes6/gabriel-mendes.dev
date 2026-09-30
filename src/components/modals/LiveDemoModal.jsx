import { useState, useEffect, useRef, useCallback, memo } from 'react'
import './LiveDemoModal.css'

// Cache de tokens por perfil — persiste enquanto a aba estiver aberta.
// Evita nova chamada à API a cada troca de perfil durante a mesma sessão.
const tokenCache = {}

// Timeout máximo de espera para a autenticação demo (ms)
const AUTH_TIMEOUT_MS = 10_000

async function fetchDemoToken(apiBaseUrl, role, signal) {
  const cached = tokenCache[role]
  if (cached && cached.expiresAt > Date.now()) return cached.token

  const response = await fetch(`${apiBaseUrl}/auth/demo-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Falha ao inicializar demo (HTTP ${response.status})`)
  }

  const data = await response.json()
  const token = data.token || data.accessToken

  if (token) {
    // Cache do token por 50 minutos (tempo seguro antes de expirar)
    tokenCache[role] = { token, expiresAt: Date.now() + 50 * 60 * 1000 }
  }

  return token
}

// Atraso antes de disparar a autenticação quando o usuário troca de perfil
// Evita múltiplas requisições ao clicar rapidamente
function useDebounced(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

const LiveDemoModal = memo(function LiveDemoModal({ project, initialRole = 'Admin', onClose }) {
  const [currentRole, setCurrentRole] = useState(initialRole)
  const [loading, setLoading] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [iframeSrc, setIframeSrc] = useState('')
  const [authError, setAuthError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const iframeRef = useRef(null)

  // Debounce de 300ms na troca de perfis — evita chamadas em rajada
  const debouncedRole = useDebounced(currentRole, 300)

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

  // Autentica e injeta o token na URL do iframe
  useEffect(() => {
    const controller = new AbortController()
    // Timeout que aborta a requisição se demorar mais que AUTH_TIMEOUT_MS
    const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS)

    setLoading(true)
    setAuthError(null)

    async function bootstrapDemo() {
      try {
        const token = await fetchDemoToken(apiBaseUrl, debouncedRole, controller.signal)

        if (token) {
          const targetUrl = `${appBaseUrl}/?auth_token=${encodeURIComponent(token)}`
          setIframeSrc(targetUrl)
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.warn('[LiveDemoModal] Timeout ao conectar ao servidor de demo.')
          setAuthError('O servidor demorou demais para responder.')
        } else {
          console.error('[LiveDemoModal] Erro ao autenticar demo:', err)
          setAuthError('Não foi possível conectar ao servidor de demonstração.')
        }
        setIframeSrc('')
        setLoading(false)
      }
    }

    bootstrapDemo()

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [debouncedRole, reloadKey, apiBaseUrl, appBaseUrl])

  // ESC fecha o fullscreen ou o modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (fullscreen) setFullscreen(false)
        else onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, fullscreen])

  // Bloqueia rolagem do body enquanto modal estiver aberto
  useEffect(() => {
    const origBody = document.body.style.overflow
    const origHtml = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = origBody
      document.documentElement.style.overflow = origHtml
    }
  }, [])

  const handleRoleChange = useCallback((newRole) => {
    if (newRole === currentRole) return
    setCurrentRole(newRole)
  }, [currentRole])

  const handleReload = useCallback(() => {
    // Limpa o cache do perfil atual para forçar novo token
    delete tokenCache[currentRole]
    setRetryCount((prev) => prev + 1)
    setReloadKey((prev) => prev + 1)
  }, [currentRole])

  const handleIframeLoad = useCallback(() => setLoading(false), [])

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
                {project?.name || 'HELPDESK AETHER'}
              </span>
              <span className="demo-modal-subtag mono">TESTE AO VIVO // SANDBOX</span>
            </div>
          </div>

          {/* Centro: Seletor de Perfil / Persona */}
          <div className="demo-modal-personas">
            <span className="demo-modal-personas-label mono">PERFIL:</span>

            {[
              { role: 'Admin', icon: '👑', label: 'Admin', title: 'Entrar como Administrador (Gestão de setores, usuários, relatórios e automações)' },
              { role: 'Agent', icon: '🎧', label: 'Atendente N2', title: 'Entrar como Atendente N2 (Gestão operacional de tickets, kanban e respostas)' },
              { role: 'Customer', icon: '👤', label: 'Cliente', title: 'Entrar como Cliente (Abertura e acompanhamento de chamados)' },
            ].map(({ role, icon, label, title }) => (
              <button
                key={role}
                type="button"
                className={`demo-modal-persona-btn mono ${currentRole === role ? 'demo-modal-persona-btn--active' : ''}`}
                onClick={() => handleRoleChange(role)}
                title={title}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
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
                Parece que estamos com uma inconsistência no sistema de demonstração.
              </p>
              {retryCount < 3 ? (
                <button
                  type="button"
                  className="demo-modal-ctrl-btn mono"
                  style={{ marginTop: '12px', padding: '8px 16px', borderColor: 'var(--bp-accent)', color: 'var(--bp-paper)' }}
                  onClick={handleReload}
                >
                  <span>🔄</span>
                  <span>Tentar Novamente ({3 - retryCount} restante{3 - retryCount !== 1 ? 's' : ''})</span>
                </button>
              ) : (
                <p className="demo-modal-error-desc mono" style={{ marginTop: '12px' }}>
                  <code>Tente novamente mais tarde!</code>
                </p>
              )}
            </div>
          )}

          {/* O iframe só é montado quando temos uma URL válida.
              loading="lazy" impede o browser de pré-carregar recursos fora da viewport. */}
          {iframeSrc && (
            <iframe
              key={`${debouncedRole}-${reloadKey}`}
              ref={iframeRef}
              src={iframeSrc}
              title={`Demonstração ao vivo do projeto ${project?.name || 'HELPDESK AETHER'}`}
              className="demo-modal-iframe"
              loading="lazy"
              allow="clipboard-read; clipboard-write; fullscreen"
              onLoad={handleIframeLoad}
            />
          )}
        </div>

        {/* Rodapé Informativo */}
        <footer className="demo-modal-footer">
          <div className="demo-modal-footer-sec mono" />
          <div className="demo-modal-footer-hint mono">
            Alterne o perfil no topo para testar fluxos entre Cliente, Atendente e Admin.
          </div>
        </footer>
      </div>
    </div>
  )
})

export default LiveDemoModal
