import useInView from '../hooks/useInView.js'
import './Reveal.css'

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
