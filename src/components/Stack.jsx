const CATEGORIES = [
  {
    code: 'FE',
    title: 'Frontend',
    items: [
      'HTML5',
      'CSS',
      'Tailwind',
      'JavaScript',
      'React',
      'Vite',
      'Axios',
    ]
  },
  {
    code: 'BE',
    title: 'Backend',
    items: [
      'PHP',
      'Laravel',
      'Python',
      'API REST',
    ]
  },
  {
    code: 'DB',
    title: 'Dados',
    items: [
      'SQL',
      'MySQL',
      'PostgreSQL',
      'Oracle',
      'Redis',
    ]
  },
  {
    code: 'IS',
    title: 'Infra & Segurança',
    items: [
      'AWS EC2',
      'Ubuntu',
      'Linux',
      'Docker',
      'Nginx',
      'JWT',
      'Rate Limiting',
    ]
  },
  {
    code: 'TL',
    title: 'Ferramentas',
    items: [
      'Git',
      'GitHub',
      'Postman',
      'Composer',
      'npm',
    ]
  },
  {
    code: 'AR',
    title: 'Arquitetura',
    items: [
      'API REST',
      'MVC',
      'SPA',
      'Responsive Design',
      'Clean Code',
    ],
  }
]

import Reveal from './Reveal.jsx'

export default function Stack() {
  return (
    <section className="section stack" style={{ paddingBottom: '4rem' }} id="stack">
      <div className="section-head">
        <span className="label">003 — Stack</span>
      </div>

      <div className="stack-legend">
        {CATEGORIES.map((cat, i) => (
          <Reveal as="div" className="stack-row" key={cat.code} delay={i * 70}>
            <div className="stack-code mono">{cat.code}</div>
            <div className="stack-title">{cat.title}</div>
            <div className="stack-items">
              {cat.items.map((item) => (
                <span className="stack-chip mono" key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
