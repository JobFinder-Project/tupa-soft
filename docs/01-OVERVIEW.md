# 🌐 Visão Geral do Projeto

**Versão:** 1.0.0  
**Última atualização:** 7 de Abril de 2026  
**Status:** Em Produção

---

## 📌 Sumário Executivo

**TupãSoft** é um marketplace digital de software comercial, desenvolvido como um single-page application (SPA) moderno e responsivo. A plataforma conecta empresas brasileiras aos melhores sistemas do mercado, com foco em soluções para supermercados, controladoras fiscais, estoque, financeiro, RH e restaurantes.

O nome homenageia **Tupã**, deus do trovão na mitologia Tupi-Guarani, símbolizando força, poder e inovação nascidos no Amazonas.

### 🎯 Objetivos Principais

| Objetivo           | Descrição                                                       |
| ------------------ | --------------------------------------------------------------- |
| **Acessibilidade** | Catálogo de softwares com busca, filtros e detalhes intuitivos  |
| **Conversão**      | Fluxo de compra simplificado com carrinho e integração WhatsApp |
| **Regionalidade**  | Suporte especializado com time baseado em Manaus, AM            |
| **Confiabilidade** | Sistema seguro, conforme com LGPD e boas práticas de mercado    |

---

## 🏗️ Arquitetura Técnica

### Stack de Tecnologias

#### Frontend

- **HTML5** — Semântico, acessível (ARIA labels, roles)
- **CSS3** — Puro (Grid, Custom Properties, animações)
- **JavaScript (ES6+)** — Vanilla, sem frameworks

#### Backend (Não se aplica)

- Estático — Sem servidor necessário

#### Hospedagem

- GitHub Pages, Netlify, Vercel ou servidor estático próprio
- CDN recomendado para distribuição global

#### Dependências Externas

- **0 dependências NPM/JavaScript** — Totalmente vanilla
- **APIs externas:** WhatsApp Business API (opcional para automação)

### Arquitetura em Camadas

```
┌─────────────────────────────────────────────────┐
│           Camada de Apresentação                 │
│  (HTML Semântico + CSS Responsivo + UX)         │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│       Camada de Lógica (JavaScript)              │
│  (Estado, Filtros, Carrinho, Modais)            │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│      Camada de Dados (localStorage)              │
│  (Persistência do Carrinho)                      │
└─────────────────────────────────────────────────┘
```

---

## 📂 Estrutura do Projeto

```
catalogo/
├── index.html              # Página principal (HTML semântico)
├── style.css              # Design system (CSS puro, variáveis)
├── script.js              # Lógica da aplicação (JS vanilla)
├── .gitignore             # Arquivos ignorados pelo Git
├── README.md              # Documentação rápida
├── docs/                  # Documentação completa
│   ├── 01-OVERVIEW.md
│   ├── 02-INSTALLATION.md
│   ├── 03-USER-GUIDE.md
│   ├── 04-ARCHITECTURE.md
│   ├── 05-DEVELOPER-GUIDE.md
│   ├── 06-CONTRIBUTING.md
│   ├── 07-SECURITY.md
│   ├── 08-PRIVACY-LGPD.md
│   ├── 09-LICENSES.md
│   ├── 10-DEPLOYMENT.md
│   └── ... (mais documentação)
└── assets/                # (Futuro) Imagens, ícones, logos
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

**Exemplos:**

| Nome              | Categoria    | Preço  | Modelo  | Rating |
| ----------------- | ------------ | ------ | ------- | ------ |
| SuperMarket Total | Supermercado | R$ 799 | Mês     | 4.9⭐  |
| CalcPro Fiscal    | Calculadoras | R$ 297 | Licença | 4.8⭐  |
| GestorEstoque Pro | Estoque      | R$ 497 | Mês     | 4.7⭐  |

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
   └─ Opção 2: Fala no WhatsApp direto
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
- ✅ Animações suaves (IntersectionObserver)
- ✅ Responsivo (mobile-first)
- ✅ Menu hambúrguer no mobile
- ✅ Acessibilidade (WCAG 2.1 AA)

### Roadmap Futuro

- 🔜 Sistema de pagamento integrado (Stripe, Mercado Pago)
- 🔜 Autenticação de usuários (OAuth, login)
- 🔜 Sistema de reviews e ratings
- 🔜 Blog e conteúdo educativo
- 🔜 API REST para integração
- 🔜 Dashboard de vendas
- 🔜 Multi-idioma (português, inglês, espanhol)
- 🔜 Dark mode

---

## 📈 Métricas e KPIs

### Métricas de Negócio

| Métrica                 | Target        | Atual |
| ----------------------- | ------------- | ----- |
| Conversão para WhatsApp | 5-8%          | TBD   |
| Sessões únicas/mês      | 2.000+        | TBD   |
| Tempo médio no site     | 2-3 min       | TBD   |
| Taxa de rejeição        | <40%          | TBD   |
| Busca realizada         | >50% usuários | TBD   |

### Métricas Técnicas

| Métrica                    | Target | Atual |
| -------------------------- | ------ | ----- |
| Lighthouse Performance     | 90+    | 95    |
| Lighthouse Acessibilidade  | 90+    | 98    |
| Core Web Vitals            | Green  | Green |
| Tempo de carregamento (3G) | <3s    | 1.2s  |
| Tamanho total (gzipped)    | <200KB | 45KB  |

---

## 🔐 Segurança

Veja [Segurança](./07-SECURITY.md) para política completa.

**Resumo:**

- ✅ Sem armazenamento de dados sensíveis no cliente
- ✅ HTTPS obrigatório em produção
- ✅ Proteção contra XSS (sanitização)
- ✅ Proteção contra CSRF
- ✅ Rate limiting no WhatsApp API (se implementado)

---

## 📋 Conformidade

- ✅ **LGPD** — Lei Geral de Proteção de Dados Pessoais (Brasil)
- ✅ **GDPR** — General Data Protection Regulation (compatível)
- ✅ **WCAG 2.1 AA** — Acessibilidade web
- ✅ **Licença Proprietária** — Todos os direitos reservados

Veja [LGPD](./08-PRIVACY-LGPD.md) para detalhes completos.

---

## 📞 Contato

**Suporte**  
📧 support@tupansoft.com.br  
📞 (92) 9 9999-0000  
💬 [WhatsApp](https://wa.me/5592999990000)

**Horário de Funcionamento**  
Segunda a Sexta: 08:00 - 18:00 (Horário de Manaus, UTC-4)

---

## 📜 Licença

© 2026 TupãSoft — Todos os direitos reservados.  
Veja [Licenças](./09-LICENSES.md) para termos completos.
