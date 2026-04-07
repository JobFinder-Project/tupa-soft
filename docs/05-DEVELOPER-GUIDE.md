# 👨‍💻 Guia do Desenvolvedor

**Versão:** 1.0.0  
**Última atualização:** 7 de Abril de 2026

---

## 🎯 Bem-vindo Ao TupãSoft Dev!

Este guia é para **desenvolvedores** que desejam:

- ✅ Entender a arquitetura
- ✅ Fazer mudanças no código
- ✅ Criar features novas
- ✅ Contribuir com o projeto

---

## 📦 Stack de Desenvolvimento

### Zero Dependências Externas ✅

- **Frontend:** HTML5 + CSS3 + JavaScript vanilla (ES6+)
- **Backend:** Não aplicável (SPA estática)
- **Build:** Não necessário
- **Package Manager:** NPM (opcional, para linting)

### Ferramentas Recomendadas

| Ferramenta          | Propósito        | Link                          |
| ------------------- | ---------------- | ----------------------------- |
| **VS Code**         | Editor           | https://code.visualstudio.com |
| **Live Server**     | Dev server (ext) | No VS Code marketplace        |
| **Chrome DevTools** | Debug            | Built-in Chrome               |
| **ESLint**          | Linting          | npm install -g eslint         |
| **Git**             | Version control  | https://git-scm.com           |

---

## 🚀 Setup Local

### 1. Clonar Repositório

```bash
git clone https://github.com/seu-usuario/catalogo.git
cd catalogo
```

### 2. Abrir em VS Code

```bash
code .
```

### 3. Instalar Live Server (Extensão)

1. VS Code → Extensions (Ctrl+Shift+X)
2. Busque "Live Server"
3. Instale extensão de Ritwick Dey

### 4. Iniciar Dev Server

1. Clique direito em `index.html`
2. Selecione "Open with Live Server"
3. Navegador abre em `http://localhost:5500`

### 5. Começar a Editar

- Altere `style.css` → Auto-reload (1s)
- Altere `script.js` → Auto-reload (1s)
- Altere `index.html` → Auto-reload (1s)

---

## 📂 Estrutura do Projeto

```
catalogo/
├── index.html              # Página principal (540 linhas)
├── style.css              # Estilos (800+ linhas)
├── script.js              # Lógica (700+ linhas)
├── .gitignore             # Git ignore
├── README.md              # Docs rápida
├── docs/                  # Documentação completa (30+ arquivos)
│   ├── 01-OVERVIEW.md
│   ├── 02-INSTALLATION.md
│   ├── ...
│   └── 17-CODE-OF-ETHICS.md
├── .github/
│   ├── workflows/         # CI/CD (futuro)
│   └── issue-templates/   # Templates (futuro)
└── assets/                # Imagens, ícones (futuro)
```

---

## 🔍 Convenções de Código

### HTML

```html
<!-- ✅ BOM: Semântico, legível, acessível -->
<section id="products" class="section">
	<h2>Catálogo</h2>
	<article class="card">
		<h3>{{ product.name }}</h3>
		<!-- Conteúdo -->
	</article>
</section>

<!-- ❌ RUIM: Div genérico, sem semântica -->
<div id="products_div">
	<div>Catálogo</div>
	<div class="item">...</div>
</div>
```

### CSS

```css
/* ✅ BOM: Nomes descritivos, custom props */
:root {
	--color-primary: #1a6b3c;
	--font-size-lg: 1.5rem;
}

.btn-primary {
	background-color: var(--color-primary);
}

/* ❌ RUIM: Cores hard-coded, nomes genéricos */
.btn {
	background-color: #1a6b3c;
}
```

### JavaScript

```javascript
"use strict";

// ✅ BOM: Declarativo, tipos claros
const formatPrice = (value) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
};

// ❌ RUIM: Genérico, sem tipos
function fmt(v) {
	return "R$ " + v.toFixed(2);
}
```

---

## 🧪 Executar Testes

### Testes Manuais

```bash
# 1. Busca
- Digite "super" → Deve filtrar produtos
- Digite "SUPER" (maiús) → Mesmos resultados
- Digite "supermarke" (sem 't') → Encontra "SuperMarket"

# 2. Filtros
- Selecione categoria "Restaurante" → Mostra 2 produtos
- Selecione preço "Até 600" → Mostra produtos <= 600
- Combine filtros → Ambos são respeitados

# 3. Carrinho
- Adicione produto → Badge atualiza
- Abra carrinho → Produto aparece
- Recarregue página (F5) → Carrinho persiste
- Remova produto → Desaparece

# 4. Responsivo
- Redimensione janela → Layout adapta
- Teste em mobile (DevTools F12 → Toggle device)
- Menu hambúrguer aparece < 768px

# 5. Acessibilidade
- Pressione Tab → Elementos focam em ordem
- Screen reader (NVDA/JAWS) → Funciona ("lista de 12 produtos")
```

### Testes Automáticos (Futuro)

```bash
# Quando implementar Jest/Vitest
npm test

# Coverage
npm run test:coverage
```

---

## 🐛 Debug

### Chrome DevTools

```
F12 → Abrir DevTools
```

#### Console

```javascript
// Ver state atual
console.log(state);

// Limpar carrinho
localStorage.removeItem("tupansoft_cart");

// Forçar re-render
renderProducts(PRODUCTS);
```

#### Elements

```
F12 → Elements → Inspecionar elemento
Veja estrutura HTML, CSS aplicado
```

#### Network

```
F12 → Network → Recarregue (F5)
Veja:
- index.html: 50KB
- style.css: 30KB
- script.js: 40KB
- Total: ~120KB (gzipped: ~45KB)
```

#### Performance

```
F12 → Performance → Record → Interaja → Stop
Veja:
- FCP (First Contentful Paint): ~0.8s
- LCP (Largest Contentful Paint): ~1.2s
- CLS (Cumulative Layout Shift): 0.0
```

---

## 📝 Adicionar um Novo Produto

### 1. Adicione ao Array `PRODUCTS` em `script.js`

```javascript
{
  id: 13,  // Deve ser único e sequencial
  name: 'Novo Software',
  category: 'supermercado',
  categoryLabel: 'Supermercado',
  price: 499,
  priceModel: 'mês',
  rating: 4.8,
  reviews: 120,
  badge: 'Novo',
  badgeType: 'badge-new',
  description: 'Descrição breve e clara.',
  features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
  icon: '🛒',
}
```

### 2. Atualizar Contagem em `CATEGORIES`

```javascript
{ id: 'supermercado', label: 'Supermercado', icon: '🛒', count: 3 } // Era 2
```

### 3. Testar

```
- Buscar "Novo"
- Filtrar por "Supermercado"
- Verificar se aparece
- Adicionar ao carrinho
```

---

## 🎨 Adicionar uma Nova Categoria

### 1. Adicione ao Array `CATEGORIES`

```javascript
{
  id: 'novo-slug',
  label: 'Nova Categoria',
  icon: '🆕',
  count: 0
}
```

### 2. Adicione Produtos a Essa Categoria

```javascript
// Em PRODUCTS, altere categoria
category: "novo-slug";
```

### 3. Atualize Contagem

```javascript
count: 2; // Se tiver 2 produtos
```

### 4. Testar

```
- Clique em categoria
- Filtra corretamente?
- Voltando a "Todos" limpa?
```

---

## 🎨 Customizar Cores

### Em `style.css`, edite `:root`

```css
:root {
	/* Temador Tupi (Atual) */
	--color-primary: #1a6b3c; /* Verde da Mata */
	--color-dark: #0d3d22;
	--color-accent: #f0ad4e; /* Dourado de ouro

  /* Ou tema Neon (Futura) */
	--color-primary: #00ff88; /* Neon verde */
	--color-dark: #001a3d;
	--color-accent: #ff00ff; /* Neon magenta */
}
```

Todas as cores serão atualizadas dinamicamente (CSS variables).

---

## 📱 Testes Responsivos

### No Chrome DevTools

```
F12 → Toggle device (Ctrl+Shift+M)
```

#### Breakpoints

| Dispositivo | Width  | Teste            |
| ----------- | ------ | ---------------- |
| iPhone SE   | 375px  | Menu hambúrguer  |
| iPhone 12   | 390px  | Fonts legível    |
| iPad        | 768px  | Layout 2 colunas |
| iPad Pro    | 1024px | Layout 3 colunas |
| Desktop     | 1440px | Máximo width     |

---

## 🔒 Segurança — Antes de Commitar

### Checklist

- [ ] Sem `console.log(password)` ou dados sensíveis
- [ ] Sem hard-coded API keys
- [ ] Sem `eval()` ou `innerHTML` com usuário input
- [ ] Validação de entrada
- [ ] Sem vulnerabilidades OWASP

```bash
# Run eslint
npx eslint script.js

# Run npm audit
npm audit
```

---

## 🚀 Enviar Para Produção

### 1. Teste Localmente

```bash
# Abra em navegadores diferentes
# Chrome, Firefox, Safari, Edge

# Limpe teste data
localStorage.clear();

# Teste mobile
DevTools toggle device mode
```

### 2. Build (se tiver assets)

```bash
# Não necessário para TupãSoft (estático)
# Mas futuro pode usar Webpack/Vite

npm run build
```

### 3. Deploy

```bash
# GitHub Pages
git add .
git commit -m "chore: Deploy v1.0.1"
git push origin main

# Netlify (automático com repositório conectado)
```

### 4. Testar em Produção

```
Acesse https://tupansoft.com

- Busca funciona?
- Carrinho persiste across visits?
- WhatsApp abre?
- Lighthouse 90+?
```

---

## 📚 Referências Externas

- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 🤝 Próximos Passos

- Ler [Arquitetura](./04-ARCHITECTURE.md)
- Ler [Guia de Contribuição](./06-CONTRIBUTING.md)
- Explorar código em `script.js`
- Fazer primeira mudança
- Enviar PR

---

**Desenvolvendo TupãSoft** ⚡  
Tem dúvidas? [Abra uma issue no GitHub](https://github.com/tupansoft/catalogo/issues)

---

**Última atualização:** 7 de Abril de 2026
