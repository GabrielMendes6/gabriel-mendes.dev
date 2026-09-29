import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Stack from './components/sections/Stack.jsx'
import Experience from './components/sections/Experience.jsx'
import Contact from './components/sections/Contact.jsx'
import TechRail from './components/interactive/TechRail.jsx'
import ScrollProgress from './components/interactive/ScrollProgress.jsx'
import DimDivider from './components/utilities/DimDivider.jsx'
import Reveal from './components/utilities/Reveal.jsx'
import Copy from './components/utilities/Copy.jsx'
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
