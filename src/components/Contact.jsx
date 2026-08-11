export default function Contact() {
  return (
    <footer className="section contact" id="contato">
      <div className="section-head">
        <span className="label">005 — Contato</span>
      </div>

      <div className="title-block">
        <div className="title-block-row">
          <div className="tb-field">
            <span className="tb-key mono">DESENHADO POR</span>
            <span className="tb-value tb-link pointer">Gabriel Mendes</span>
          </div>
          <div className="tb-field">
            <span className="tb-key mono">FUNÇÃO</span>
            <span className="tb-value tb-link pointer">Fullstack Developer</span>
          </div>
        </div>

        <div className="title-block-row">
          <div className="tb-field">
            <span className="tb-key mono">GITHUB</span>
            <a className="tb-value tb-link" href="https://github.com/GabrielMendes6" target="_blank" rel="noreferrer">
              github.com/GabrielMendes6
            </a>
          </div>
          <div className="tb-field">
            <span className="tb-key mono">E-MAIL</span>
            <a className="tb-value tb-link" href="mailto:gabrielmendesx06@gmail.com">
              gabrielmendesx06@gmail.com
            </a>
          </div>
        </div>

        <div className="title-block-row title-block-row-end">
          <div className="tb-field">
            <span className="tb-key mono">FOLHA</span>
            <span className="tb-value mono tb-link pointer">01/01</span>
          </div>
          <div className="tb-field">
            <span className="tb-key mono">REVISÃO</span>
            <span className="tb-value mono tb-link pointer">2026.08</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
