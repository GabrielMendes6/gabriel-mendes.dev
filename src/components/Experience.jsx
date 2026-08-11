import Reveal from './Reveal.jsx'

const PROJECTS = [
  {
    id: 'aether-page-builder',
    name: 'AETHER PAGE BUILDER',
    status: 'EM DESENVOLVIMENTO',
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
  return (
    <section className="section experience" id="projeto">
      <div className="section-head">
        <span className="label">004 — Projetos em destaque</span>
      </div>

      <div className="exp-list">
        {PROJECTS.map((project) => (
          <Reveal as="div" className="exp-card" key={project.id}>
            <div className="exp-card-head">
              <h3 className="exp-name mono">{project.name}</h3>
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
          </Reveal>
        ))}
      </div>
    </section>
  )
}
