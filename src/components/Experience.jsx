import { useState } from 'react'
import Reveal from './Reveal.jsx'
import LiveDemoModal from './LiveDemoModal.jsx'

const PROJECTS = [
  {
    id: 'support-suite',
    name: 'SUPPORT SUITE',
    status: 'ONLINE / TEST DRIVE DISPONÍVEL',
    hasDemo: true,
    summary:
      'Sistema corporativo completo de Gestão de Chamados, Service Desk e Atendimento Multissetorial — backend de alta performance em .NET 10 (C#) e frontend SPA reativo em React.',
    specs: [
      {
        tag: 'ARQUITETURA',
        text: 'Clean Architecture e DDD em .NET 10, com CQRS/UseCases desacoplados, Entity Framework Core com PostgreSQL e migrations automatizadas.',
      },
      {
        tag: 'SEGURANÇA',
        text: 'Autenticação JWT com Refresh Tokens rotativos, RBAC granular com 32 permissões, rate limiting nomeado por endpoint e sanitização rigorosa contra XSS/IDOR.',
      },
      {
        tag: 'REALTIME',
        text: 'Notificações e sincronização de tickets, mensagens na timeline e alertas urgentes em tempo real via WebSockets / SignalR com fallback resiliente.',
      },
      {
        tag: 'WORKFLOW',
        text: 'Kanban interativo, gestão de SLAs dinâmicos com contagem regressiva, trâmites de atendimento, automações por eventos e base de conhecimento.',
      },
      {
        tag: 'SANDBOX',
        text: 'Modo de demonstração interativo com isolamento de banco de dados (zero persistência no banco de produção) e alternância instantânea entre 3 perfis de acesso.',
      },
    ],
  },
  {
    id: 'aether-page-builder',
    name: 'AETHER PAGE BUILDER',
    status: 'EM DESENVOLVIMENTO',
    hasDemo: false,
    summary:
      'Editor de páginas drag-and-drop construído do zero, com posicionamento por grid — Laravel, React e Inertia.js.',
    specs: [
      {
        tag: 'GRID',
        text: 'Sistema de arrasto e redimensionamento sobre grid usando react-grid-layout, com edição visual de componentes, seções e paginas',
      },
      {
        tag: 'HISTÓRICO',
        text: 'Undo/redo completo sobre o estado do editor, permitindo desfazer qualquer alteração de layout ou conteúdo.',
      },
      {
        tag: 'VISIBILIDADE',
        text: 'Controle de visibilidade por dispositivo (enum), definindo o que aparece em desktop e mobile de forma independente.',
      },
      {
        tag: 'DADOS',
        text: 'Persistência de layouts como JSON no banco, com parsing e sincronização entre o estado do editor e o schema salvo.',
      },
      {
        tag: 'UI',
        text: 'Painel de debug, telas de edição de layout dos componentes e paginas',
      },
    ],
  },
  {
    id: 'aether-ai',
    name: 'AETHER AI',
    status: 'EM DESENVOLVIMENTO',
    hasDemo: false,
    summary:
      'Plataforma de assistente de IA pessoal, arquitetada e desenvolvida do zero — backend em Laravel, frontend em React.',
    specs: [
      {
        tag: 'AUTH',
        text: 'Autenticação via Laravel Sanctum (SPA), com sessão baseada em cookie httpOnly e proteção CSRF, usando um guard de autenticação dedicado.',
      },
      {
        tag: 'SEGURANÇA',
        text: 'Hardening completo: rate limiting nomeado, validação de senha com checagem HaveIBeenPwned, logging estruturado, correção de IDOR e SSRF.',
      },
      {
        tag: 'DADOS',
        text: 'Modelo de domínio próprio com hashing Argon2id, deploy em AWS EC2 atrás de nginx.',
      },
      {
        tag: 'IA',
        text: 'Integração com Groq — Llama 3.3 70B para chat, Whisper para transcrição de áudio e canopylabs/orpheus-v1-english para reprodução da resposta por voz.',
      },
      {
        tag: 'UI',
        text: 'Design system "Aether HUD" próprio, componentes reativos por estado e interface de chat completa em React.',
      },
    ],
  },
]

export default function Experience() {
  const [activeDemo, setActiveDemo] = useState(null)
  const [activeRole, setActiveRole] = useState('Admin')

  function handleOpenDemo(project, role = 'Admin') {
    setActiveRole(role)
    setActiveDemo(project)
  }

  return (
    <section className="section experience" id="projeto">
      <div className="section-head">
        <span className="label">004 — Projetos em destaque</span>
      </div>

      <div className="exp-list">
        {PROJECTS.map((project) => (
          <Reveal as="div" className="exp-card" key={project.id}>
            <div className="exp-card-head">
              <div className="exp-card-title-group">
                <h3 className="exp-name mono">{project.name}</h3>
                {project.hasDemo && (
                  <button
                    type="button"
                    className="exp-demo-btn mono"
                    onClick={() => handleOpenDemo(project, 'Admin')}
                    title="Abrir menu de demonstração e test drive interativo"
                  >
                    <span className="exp-demo-pulse" />
                    <span>⚡ TEST DRIVE AO VIVO</span>
                  </button>
                )}
              </div>
              <span className="exp-status mono">{project.status}</span>
            </div>

            <p className="exp-summary">{project.summary}</p>

            <div className="exp-specs">
              {project.specs.map((spec, i) => (
                <Reveal as="div" className="exp-spec-row" key={spec.tag} delay={i * 80}>
                  <span className="exp-spec-tag mono">{spec.tag}</span>
                  <p className="exp-spec-text">{spec.text}</p>
                </Reveal>
              ))}
            </div>

            {project.hasDemo && (
              <div className="exp-demo-cta-row">
                <button
                  type="button"
                  className="exp-demo-main-btn mono"
                  onClick={() => handleOpenDemo(project, 'Admin')}
                >
                  <span>👑 Testar como Administrador</span>
                </button>
                <button
                  type="button"
                  className="exp-demo-main-btn mono"
                  onClick={() => handleOpenDemo(project, 'Agent')}
                >
                  <span>🎧 Testar como Atendente N2</span>
                </button>
                <button
                  type="button"
                  className="exp-demo-main-btn mono"
                  onClick={() => handleOpenDemo(project, 'Customer')}
                >
                  <span>👤 Testar como Cliente</span>
                </button>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {/* Modal de Test Drive Interativo */}
      {activeDemo && (
        <LiveDemoModal
          project={activeDemo}
          initialRole={activeRole}
          onClose={() => setActiveDemo(null)}
        />
      )}
    </section>
  )
}
