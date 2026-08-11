# Gabriel Mendes — Portfólio

Portfólio pessoal em React + Vite, com identidade visual própria: **"Blueprint"** — planta técnica de engenharia (fundo azul-prussiano, grid de desenho técnico, marcações de canto tipo prancheta CAD, divisórias em linha de cotagem, accent laranja de caneta de revisão).

🔗 **Produção:** [gabriel.aethercorp.com.br](https://gabriel.aethercorp.com.br)

## Rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/`, pronta pra deploy (Vercel, Netlify, etc).

## Stack

React 18 · Vite · CSS puro (design tokens via CSS variables, sem framework) · [react-icons](https://www.npmjs.com/package/react-icons) (ícones de marca da esteira de tecnologias)

## Funcionalidades

- **Esteira de tecnologias** (`TechRail`) — carrossel infinito com física própria via `requestAnimationFrame`: roda sozinho, **clique rápido** num ícone abre um popup com detalhes da tecnologia, **segurar** pausa a rolagem, e **arrastar** navega manualmente. Ícones monocromáticos que ganham a cor da marca no hover.
- **Reveal on scroll** (`Reveal` + `useInView`) — seções e itens de lista entram com fade + leve subida ao rolar a página até eles, repetindo a animação toda vez que saem e voltam à viewport (respeita `prefers-reduced-motion`).
- **Régua de progresso** (`ScrollProgress`) — escala vertical fixa (desktop) mostrando o quanto da página já foi rolada, estilo régua de desenhista.
- **Divisores animados** (`DimDivider`) — linhas de cotagem que se desenham via CSS ao entrar na tela.

## Estrutura

```
src/
  components/
    Hero.jsx / Hero.css        — seção inicial (nome, cargo, tagline)
    About.jsx                  — sobre você
    Stack.jsx                  — tabela de tecnologias por categoria
    TechRail.jsx / .css        — esteira de ícones (drag, hold-to-pause, popup)
    TechModal.jsx / .css       — popup de detalhes de cada tecnologia
    Experience.jsx             — fichas técnicas dos projetos em destaque
    Contact.jsx                — carimbo de contato (GitHub, e-mail)
    DimDivider.jsx              — divisor animado (linha de cotagem)
    Reveal.jsx / Reveal.css     — wrapper de animação on-scroll
    ScrollProgress.jsx / .css   — régua de progresso lateral
  data/
    techs.js                   — dados de cada tecnologia (ícone, cor, descrição, projetos, motivo de uso)
  hooks/
    useInView.js                — hook de IntersectionObserver por trás do Reveal
  App.jsx / App.css             — composição das seções
  index.css                     — design tokens (cores, tipografia, grid de fundo, scrollbar)
```

## Editar conteúdo

- Texto do Hero: `src/components/Hero.jsx`
- Texto do "Sobre": `src/components/About.jsx`
- Stack técnica (tabela por categoria): array `CATEGORIES` em `src/components/Stack.jsx`
- Tecnologias da esteira: array `TECHS` em `src/data/techs.js` — cada item tem `Icon`, `color`, `description`, `projects` e `why`
- Projetos em destaque: array `PROJECTS` em `src/components/Experience.jsx`
- Links de contato: `src/components/Contact.jsx`
- Cores/fontes/grid de fundo: variáveis `:root` em `src/index.css`

## Deploy

Hospedado na **Vercel**, com domínio próprio (`gabriel.aethercorp.com.br`) apontado via CNAME no DNS. SSL emitido automaticamente pela Vercel — sem nginx nem certbot envolvidos aqui (diferente do Aether AI, que roda em EC2).

Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.