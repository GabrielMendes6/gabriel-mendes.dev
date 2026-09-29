import './Hero.css'

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-tag mono">FICHA 001 / PERFIL</div>

      <h1 className="hero-title">
        <span className="hero-title-line">GABRIEL</span>
        <span className="hero-title-line hero-title-outline">MENDES</span>
      </h1>

      <p className="hero-role label">
        Fullstack Developer <span className="hero-role-sep">—</span> Web Developer
      </p>

      <p className="hero-desc">
        Desenvolvedor fullstack com experiência em aplicações web completas — banco de dados, 
        backend e frontend. Trabalho com foco em soluções robustas e na causa raiz de cada problema.
      </p>

      <div className="hero-meta mono">
        <span>ESCALA 1:1</span>
        <span className="hero-meta-sep">·</span>
        <span>SC, BRASIL</span>
        <span className="hero-meta-sep">·</span>
        <span>REV. 2026</span>
      </div>
    </header>
  )
}
