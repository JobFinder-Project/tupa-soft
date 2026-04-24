# 🌐 Visão Geral do Projeto

**Versão:** 2.1.0  
**Última atualização:** 23 de Abril de 2026  
**Status:** Em Desenvolvimento (Full-Stack)

---

## 📌 Sumário Executivo

**TupãSoft** é uma plataforma digital de soluções de software em desenvolvimento, com arquitetura full-stack e catálogo web responsivo. A empresa atua em três frentes: venda de templates próprios, revenda de softwares de parceiros e desenvolvimento de software personalizado sob especificação do cliente. O foco está em soluções para supermercados, controladoras fiscais, estoque, financeiro, RH e restaurantes.

O nome homenageia **Tupã**, deus do trovão na mitologia Tupi-Guarani, símbolizando força, poder e inovação nascidos no Amazonas.

### 🎯 Objetivos Principais

| Objetivo           | Descrição                                                       |
| ------------------ | --------------------------------------------------------------- |
| **Acessibilidade** | Catálogo de softwares com busca, filtros e detalhes intuitivos  |
| **Conversão**      | Fluxo de compra simplificado com carrinho e integração WhatsApp |
| **Flexibilidade**  | Atendimento em três modelos: próprio, revenda e sob demanda     |
| **Confiabilidade** | Sistema seguro, conforme com LGPD e boas práticas de mercado    |

---

## 🏗️ Arquitetura Técnica

### Stack de Tecnologias

#### Frontend

- **React 19** — UI library moderna e reativa
- **Vite** — Build tool rápido e otimizado
- **CSS3** — Responsivo com Custom Properties
- **JavaScript (ES6+)** — Hooks, composição funcional

#### Backend

- **Node.js** — Runtime JavaScript servidor
- **Express.js** — Framework HTTP minimalista
- **Sequelize** — ORM para banco de dados
- **PostgreSQL** — Banco de dados relacional

#### Infraestrutura

- **Docker & Docker Compose** — Containerização e orquestração
- **GitHub Actions** — CI/CD planejado
- **PostgreSQL 16** — Dados persistentes (categorias, produtos, inquéritos)

#### Dependências Externas

- **npm packages** — Gerenciamento de dependências (frontend e backend)
- **APIs externas:** WhatsApp Business API (opcional para automação)

### Arquitetura em Camadas

```
┌──────────────────────────────────────────────────────────┐
│               CLIENTE (Browser)                           │
│  React Components + Vite Build + HTTP Requests           │
└──────────────────┬───────────────────────────────────────┘
                   │ HTTP/REST API
┌──────────────────▼───────────────────────────────────────┐
│        SERVIDOR (Node.js/Express)                        │
│  Routes → Controllers → Services → Models                │
└──────────────────┬───────────────────────────────────────┘
                   │ SQL Queries
┌──────────────────▼───────────────────────────────────────┐
│  BANCO DE DADOS (PostgreSQL)                             │
│  (Categorias, Produtos, Inquéritos, Features)            │
└──────────────────────────────────────────────────────────┘
```

---

## 📂 Estrutura do Projeto

```
tupa-soft/
├── backend/                    # Node.js + Express
│   ├── src/
│   │   ├── config/            # Variáveis de ambiente
│   │   ├── controllers/       # Lógica das rotas
│   │   ├── services/          # Regras de negócio
│   │   ├── models/            # Sequelize ORM
│   │   ├── routes/            # Definição de endpoints
│   │   ├── middlewares/       # Express middlewares
│   │   ├── dtos/              # Data Transfer Objects
│   │   ├── utils/             # Utilitários
│   │   ├── db/                # Configuração banco
│   │   ├── app.js             # App Express
│   │   └── server.js          # Inicialização
│   ├── db/sql/
│   │   └── init.sql           # Schema e seeds
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── catalog/       # Componentes catálogo
│   │   │   ├── layout/        # Layout principal
│   │   │   ├── modals/        # Modais
│   │   │   └── ui/            # Componentes genéricos
│   │   ├── pages/             # Páginas principais
│   │   ├── services/          # API calls (HTTP)
│   │   ├── hooks/             # React hooks customizados
│   │   ├── utils/             # Utilitários
│   │   ├── styles/            # CSS modular
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                # Assets estáticos
│   ├── Dockerfile
│   ├── vite.config.js         # Build config
│   ├── package.json
│   └── README.md
├── docs/                       # Documentação completa
│   ├── 01-OVERVIEW.md
│   ├── 03-USER-GUIDE.md
│   ├── 04-ARCHITECTURE.md
│   ├── 05-DEVELOPER-GUIDE.md
│   ├── 10-DEPLOYMENT.md
│   ├── 07-SECURITY.md
│   └── ... (mais documentação)
├── docker-compose.yml         # Orquestração de serviços
├── .github/
│   └── workflows/             # GitHub Actions CI/CD (planejado)
├── .gitignore
└── README.md                  # Documentação principal
```

---

## 🎨 Design System

### Paleta de Cores (Amazônia)

| Cor             | Código    | Uso                        |
| --------------- | --------- | -------------------------- |
| Verde Primário  | `#1a6b3c` | Botões, CTA, theme         |
| Verde Escuro    | `#0d3d22` | Backgrounds escuros, hover |
| Amarelo Acento  | `#f0ad4e` | Badges, destaque           |
| Branco          | `#ffffff` | Backgrounds claros         |
| Cinza Neutro    | `#6b7280` | Textos secundários         |
| Vermelho Alerta | `#dc2626` | Erros, validações          |
| Azul Info       | `#2563eb` | Links, informações         |

### Tipografia

- **Fonte Principal:** System fonts (Segoe UI, Helvetica, Arial)
- **Tamanhos:** 14px (mobile) → 16px (desktop)
- **Contraste WCAG AA+** — Acessibilidade garantida

### Componentes Reutilizáveis

- **Botões:** Primário, Ghost, WhatsApp, outline
- **Cards:** Produto, categoria, depoimento
- **Modais:** Carrinho, detalhes do produto
- **Badges:** Hot, New, Accent, Primary
- **Inputs:** Busca (desktop + mobile), filtros

---

## 📊 Dados do Catálogo

### Categorias

| ID             | Nome                    | Ícone | Produtos |
| -------------- | ----------------------- | ----- | -------- |
| `supermercado` | Gestão de Supermercado  | 🛒    | 2        |
| `calculadoras` | Calculadoras Fiscais    | 🧮    | 2        |
| `estoque`      | Controle de Estoque     | 📦    | 2        |
| `financeiro`   | Financeiro              | 💰    | 2        |
| `rh`           | RH e Folha de Pagamento | 👥    | 2        |
| `restaurante`  | Restaurante / PDV       | 🍽️    | 2        |

### Produtos

**Total:** 12 produtos  
**Modelo de Preço:** Mensal (mês) ou Licença única

**Origem da Oferta:** Catálogo pode incluir produtos próprios e soluções de parceiros.

**Exemplos:**

| Nome                | Categoria    | Preço base | Modelo | Rating |
| ------------------- | ------------ | ---------- | ------ | ------ |
| SuperMarket Total   | Supermercado | R$ 349,90  | Mês    | 4.8⭐  |
| Calc Price Plus     | Calculadoras | R$ 79,90   | Mês    | 4.6⭐  |
| GestorEstoque Pro   | Estoque      | R$ 159,90  | Mês    | 4.7⭐  |

---

## 🔄 Fluxo Funcional

### Fluxo de Usuário

```
1. Usuário chega no site
   ↓
2. Browse/Busca produtos
   ├─ Busca textual (debounce, acentos)
   ├─ Filtro por categoria
   ├─ Filtro por faixa de preço
   └─ Ordenação (preço, rating)
   ↓
3. Clica em produto → Modal de detalhes
   ├─ Vê features, rating, descrição
   ├─ Opção 1: Adiciona ao carrinho
   ├─ Opção 2: Fala no WhatsApp direto
   └─ Opção 3: Solicita versão personalizada
   ↓
4. Carrinho (localStorage)
   ├─ Ver itens adicionados
   └─ Checkout via WhatsApp
   ↓
5. WhatsApp é aberto com mensagem pré-formatada
   └─ Equipe de vendas segue o contato
```

---

## ⚡ Funcionalidades Principais

### MVP Atual (v1.0)

- ✅ Catálogo com 12 softwares em 6 categorias
- ✅ Busca com debounce e normalização de acentos
- ✅ Filtros por categoria, preço e ordenação
- ✅ Carrinho com persistência via localStorage
- ✅ Modal de detalhes com features e rating
- ✅ Integração WhatsApp para contato
- ✅ Operação comercial híbrida (produto próprio, revenda e projeto sob demanda)

### Roadmap Futuro

- 🔜 Sistema de pagamento integrado (Stripe, Mercado Pago)
- 🔜 Autenticação de usuários (OAuth, login)
- 🔜 Dashboard de vendas

---

## 📜 Licença

© 2026 TupãSoft — Todos os direitos reservados.  
Veja [Licenças](./09-LICENSES.md) para termos completos.
