import Hero from './components/Hero.jsx'
import TechRail from './components/TechRail.jsx'
import About from './components/About.jsx'
import Stack from './components/Stack.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import DimDivider from './components/DimDivider.jsx'
import Reveal from './components/Reveal.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Copy from './components/Copy.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <div className="blueprint-grid" aria-hidden="true" />
      <div className="crosshair tl" aria-hidden="true" />
      <div className="crosshair tr" aria-hidden="true" />
      <div className="crosshair bl" aria-hidden="true" />
      <div className="crosshair br" aria-hidden="true" />
      <ScrollProgress />

      <main>
        <Hero />
        <DimDivider label="00.1" />
        <Reveal><About /></Reveal>
        <DimDivider label="00.2" />
        <Stack />
        <TechRail />
        <DimDivider label="00.3" />
        <Experience />
        <DimDivider label="00.4" />
        <Reveal><Contact /></Reveal>
        <Copy />
        
      </main>
    </>
  )
}
