import {
    SiHtml5,
    SiCss,
    SiTailwindcss,
    SiJavascript,
    SiReact,
    SiVite,
    SiPhp,
    SiLaravel,
    SiMysql,
    SiRedis,
    SiDocker,
    SiUbuntu,
    SiLinux,
    SiNginx,
    SiGit,
    SiPostgresql,
    SiAxios,
} from 'react-icons/si'

import { 
    FaShieldHalved, 
    FaAws,
    FaNpm,
} from 'react-icons/fa6';

// TEXTOS DE REVISÃO: escrevi a partir do que sei do seu trabalho, mas
// ajuste à vontade — principalmente os campos "projects" e "why" de cada
// tecnologia, pra garantir que reflete exatamente como você usa cada uma.
export const TECHS = [
    {
        Icon: SiHtml5,
        name: 'HTML5',
        color: '#E34F26',
        description: 'Estrutura semântica de toda interface — a base sobre a qual tudo mais é construído.',
        projects: ['Aether AI', 'Aether Page Builder', 'Este portfólio'],
        why: 'Semântica e acessibilidade certas desde o início evitam retrabalho depois — título certo, hierarquia certa, formulário certo.',
    },
    {
        Icon: SiCss,
        name: 'CSS',
        color: '#038ef0',
        description: 'Estilização pura, sem dependência de framework — variáveis CSS, grid, flexbox e animações nativas.',
        projects: ["Aether AI (design - 'Aether HUD')", "Este portfólio (design - 'Blueprint')"],
        why: 'Prefiro controlar cores, espaçamentos e animações diretamente com CSS, mantendo uma identidade visual consistente sem depender de um framework.',
    },
    {
        Icon: SiTailwindcss,
        name: 'Tailwind',
        color: '#06B6D4',
        description: 'Framework utility-first pra estilizar direto no markup, sem sair do componente.',
        projects: ['Protótipos e MVPs'],
        why: 'Quando a prioridade é validar uma ideia rápido, sem montar um design do zero, Tailwind acelera bastante.',
    },
    {
        Icon: SiJavascript,
        name: 'JavaScript',
        color: '#F7DF1E',
        description: 'A linguagem por trás de toda lógica de frontend — e de boa parte da lógica assíncrona também.',
        projects: ['Aether AI', 'Aether Page Builder', 'Este portfólio'],
        why: 'Base de tudo que faço em React. Entender bem o motor por trás evita depender cegamente de abstrações.',
    },
    {
        Icon: SiReact,
        name: 'React',
        color: '#61DAFB',
        description: 'Biblioteca de componentes que uso pra construir toda interface reativa.',
        projects: ['Aether AI', 'Aether Page Builder', 'Este portfólio'],
        why: 'Componentização e um modelo de estado previsível tornam interfaces complexas — como um editor visual ou um chat com streaming — muito mais fáceis de manter.',
    },
    {
        Icon: SiVite,
        name: 'Vite',
        color: '#FFD62E',
        description: 'Bundler e dev server rápido pra rodar e buildar projetos React.',
        projects: ['Aether AI (frontend)', 'Aether Page Builder (frontend)', 'Este portfólio'],
        why: 'Hot reload quase instantâneo e build de produção enxuto, sem a complexidade de configurar um bundler do zero.',
    },
    {
        Icon: SiPhp,
        name: 'PHP',
        color: '#777BB4',
        description: 'Linguagem utilizada no desenvolvimento das APIs e regras de negócio dos meus projetos.',
        projects: ['Aether AI (API)', 'Aether Page Builder (API)'],
        why: 'Ecossistema maduro e produtivo pra construir APIs robustas rápido, sem abrir mão de boas ferramentas.',
    },
    {
        Icon: SiLaravel,
        name: 'Laravel',
        color: '#FF2D20',
        description: 'Framework PHP para desenvolvimento de APIs REST, autenticação, filas, cache e acesso a banco de dados.',
        projects: ['Aether AI', 'Aether Page Builder'],
        why: 'Resolve de fábrica os 80% comuns de qualquer backend (auth, validação, migrations), sobrando tempo pro que é específico do produto.',
    },
    {
        Icon: SiMysql,
        name: 'MySQL',
        color: '#4479A1',
        description: 'Banco relacional principal dos meus projetos.',
        projects: ['Aether Page Builder'],
        why: 'Relações bem definidas entre componentes, sessões e personalização pedem um banco relacional maduro, com transações confiáveis.',
    },
    {
        Icon: SiRedis,
        name: 'Redis',
        color: '#FF4438',
        description: 'Armazenamento em memória — cache, filas e sessões.',
        projects: ['Aether AI', 'Aether Page Builder'],
        why: 'Tira carga do banco em operações repetitivas e processa tarefas assíncronas — como transcrição de áudio — sem travar a resposta ao usuário.',
    },
    {
        Icon: SiDocker,
        name: 'Docker',
        color: '#2496ED',
        description: 'Containers pra empacotar e rodar aplicações de forma consistente.',
        projects: ['Ambiente de desenvolvimento e deploy'],
        why: "Elimina o clássico 'na minha máquina funciona' — o ambiente de produção fica idêntico ao local.",
    },
    {
        Icon: SiUbuntu,
        name: 'Ubuntu',
        color: '#E95420',
        description: 'Distribuição Linux que uso como base dos servidores.',
        projects: ['Aether AI (deploy em AWS EC2)'],
        why: 'Estável, com suporte de longo prazo (LTS) e documentação enorme pra qualquer problema de infraestrutura.',
    },
    {
        Icon: SiLinux,
        name: 'Linux',
        color: '#FCC624',
        description: 'Sistema operacional utilizado no desenvolvimento e na administração de servidores.',
        projects: ['Aether AI', 'Aether Page Builder'],
        why: 'Controle total sobre o ambiente — de permissão de arquivo a configuração de rede — sem camada extra entre mim e o servidor.',
    },
    {
        Icon: SiNginx,
        name: 'Nginx',
        color: '#009639',
        description: 'Servidor web e proxy reverso.',
        projects: ['Aether AI (deploy em EC2)'],
        why: 'Proxy reverso pro backend Laravel, com headers de segurança configurados na camada de servidor, antes mesmo da aplicação.',
    },
    {
        Icon: SiGit,
        name: 'Git',
        color: '#F05032',
        description: 'Controle de versão pra todo código que escrevo.',
        projects: ['Todos os projetos'],
        why: 'Histórico claro de decisões e a segurança de poder reverter qualquer mudança sem medo de quebrar produção.',
    },
    {
        Icon: SiPostgresql,
        name: 'PostgreSQL',
        color: '#4169E1',
        description: 'Banco relacional alternativo ao MySQL, com recursos avançados (JSONB, full-text search).',
        projects: ['Aether AI'],
        why: 'Utilizo quando preciso de recursos avançados, como JSONB, consultas complexas e maior flexibilidade para modelagem de dados.'
    },
    {
        Icon: FaShieldHalved,
        name: 'Sanctum',
        color: '#F59E0B',
        description: 'Autenticação SPA baseada em sessão com cookie httpOnly, protegida por CSRF token.',
        projects: ['Aether AI'],
        why: 'Mantém a sessão segura e stateful entre frontend e backend, com cookies httpOnly (inacessíveis via JavaScript) e proteção CSRF nativa do Laravel.'
    },
    {
        Icon: SiAxios,
        name: 'Axios',
        color: '#5A29E4',
        description: 'Cliente HTTP utilizado para comunicação entre aplicações React e APIs REST.',
        projects: ['Aether AI', 'Aether Page Builder', 'Este portfólio'],
        why: 'Centraliza a comunicação com a API em um único ponto, tornando o código mais organizado, reutilizável e simples de manter conforme a aplicação cresce.'
    },
    {
        Icon: FaAws,
        name: 'AWS',
        color: '#FF9900',
        description: 'Plataforma de computação em nuvem utilizada para hospedar aplicações e serviços.',
        projects: ['Aether AI'],
        why: 'Oferece infraestrutura escalável e confiável, permitindo que a aplicação evolua sem depender de um ambiente físico ou de configurações limitadas.'
    },
    {
        Icon: FaNpm,    
        name: 'npm',
        color: '#ff0000',
        description: 'Gerenciador de pacotes utilizado em projetos JavaScript.',
        projects: ['Todos os projetos frontend'],
        why: 'Automatiza a instalação de dependências e a execução das ferramentas utilizadas durante o desenvolvimento.'
    }
    

]