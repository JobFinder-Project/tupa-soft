# 🤝 Guia de Contribuição

**Versão:** 1.0.0  
**Última atualização:** 7 de Abril de 2026

---

## 🎉 Bem-vindo Contribuidor!

Obrigado por considerar contribuir com **TupãSoft**! Este documento guia como colaborar com o projeto.

---

## 📋 Tipos de Contribuição

### 🐛 Reportar Bugs

**Se encontrou um bug:**

1. Verifique se já foi reportado em [Issues](https://github.com/tupansoft/catalogo/issues)
2. Se novo, [abra uma issue](https://github.com/tupansoft/catalogo/issues/new)

**Template:**

```markdown
**Descrição**
Breve descrição do bug

**Steps to Reproduce**

1. Abra a página
2. Clique em [botão]
3. Erro aparece

**Expected Behavior**
O que deveria acontecer

**Actual Behavior**
O que realmente acontece

**Environment**

- OS: Windows 10
- Browser: Chrome 120
- Version: v1.0.0

**Screenshots**
[Se aplicável]
```

### 💡 Sugerir Features

**Tem uma ideia?**

1. Verifique se foi sugerida em [Discussions](https://github.com/tupansoft/catalogo/discussions)
2. Se nova, abra uma discussion

**Template:**

```markdown
**Descrição da Feature**
O que você quer adicionar?

**Problema Resolvido**
Qual problema resolve?

**Solução Proposta**
Como implementar?

**Alternativas Consideradas**
Outras opções?

**Contexto Adicional**
Links, exemplos, etc
```

### 💻 Contribuir Código

**Quer fazer mudanças?**

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Faça commit: `git commit -am 'Add: nova feature'`
4. Push: `git push origin feature/sua-feature`
5. Abra um PR (Pull Request)

### 📚 Melhorar Documentação

**Melhorias em docs:**

- Corrigir erros de digitação
- Melhorar clareza
- Adicionar exemplos
- Atualizar links

Mesma processo que código (fork → branch → PR)

### 🌍 Traduzir para Outro Idioma

**Traduções futuras (português, espanhol, inglês):**

Avise em uma discussion: `[Translation] [Idioma]`

---

## 🔄 Fluxo de Contribuição

### 1. Fork

```bash
# No GitHub, clique "Fork" (canto superior direito)
# Isso cria uma cópia em sua conta
```

### 2. Clone Seu Fork

```bash
git clone https://github.com/SEU-USUARIO/catalogo.git
cd catalogo
```

### 3. Adicione Remote Upstream

```bash
git remote add upstream https://github.com/tupansoft/catalogo.git

# Verifique
git remote -v
# origin     your fork
# upstream   official repo
```

### 4. Crie uma Branch

```bash
# Features novas
git checkout -b feature/nome-da-feature

# Bug fixes
git checkout -b fix/nome-do-bug

# Documentação
git checkout -b docs/topico

# Exemplos de branches
git checkout -b feature/dark-mode
git checkout -b fix/carrinho-nao-salva
git checkout -b docs/guia-seguranca
```

### 5. Faça Mudanças

```bash
# Edite arquivos
code script.js
```

### 6. Teste Localmente

```bash
# Abra Live Server
# Teste no Chrome, Firefox
# Verifique acessibilidade
# Verifique responsividade
```

### 7. Commit

```bash
# Verifique mudanças
git status
git diff

# Adicione arquivos
git add script.js style.css

# Commit com mensagem clara
git commit -m "feat: Adicionar dark mode

- Agrupa alterações relacionadas
- Explica o quê e por quê
- Referencia issue: fixes #123"
```

### 8. Push

```bash
git push origin feature/dark-mode
```

### 9. Abra um Pull Request (PR)

1. Vá para seu fork no GitHub
2. Botão "Compare & pull request" aparece
3. Descreva mudanças
4. Submit PR

---

## 📝 Mensagens de Commit

### Formato (Conventional Commits)

```
<tipo>(<escopo>): <assunto>

<corpo>

<footer>
```

### Tipos

| Tipo       | Uso                     | Exemplo                                 |
| ---------- | ----------------------- | --------------------------------------- |
| `feat`     | Nova feature            | `feat: adicionar dark mode`             |
| `fix`      | Bug fix                 | `fix: carrinho não salva`               |
| `docs`     | Documentação            | `docs: atualizar README`                |
| `style`    | Formatação (sem lógica) | `style: alinhar indentação`             |
| `refactor` | Refatoração             | `refactor: simplificar filterandSort()` |
| `test`     | Testes                  | `test: adicionar testes carrinho`       |
| `chore`    | Build, CI/CD            | `chore: atualizar dependencies`         |

### Exemplos Bons

```
feat(busca): adicionar destaque de termo encontrado

Antes, o termo buscado não era destacado visualmente.
Agora aparece em destaque com background amarelo quando encontrado.

fixes #123
```

```
fix(carrinho): localStorage não persiste em navegação privada

localStorage throw error em modo privado (iPhone).
Adicionado try-catch para fallback graceful.

fixes #456
```

```
docs: adicionar seção de troubleshooting
```

---

## ✅ Checklist Antes do PR

- [ ] Código segue convenções (veja abaixo)
- [ ] Sem console.log() em produção
- [ ] Sem hard-coded values
- [ ] Testado em Chrome, Firefox, Safari
- [ ] Testado em mobile (DevTools)
- [ ] Sem warnings no console
- [ ] Commits com mensagens claras
- [ ] Branch atualizada com `upstream/main`

### Atualizar Branch com Main

```bash
# Fetch upstream
git fetch upstream

# Rebase com main
git rebase upstream/main

# Se tiver conflitos, resolva manualmente

# Force push (cuidado!)
git push origin feature/sua-feature -f
```

---

## 🛠️ Padrões de Código

### JavaScript

```javascript
"use strict";

// ✅ BOM
const getNicePrice = (value) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
};

// ❌ RUIM
function fmt(v) {
	return "r$ " + v;
}
```

### CSS

```css
/* ✅ BOM: Classes descritivas, variáveis */
:root {
	--spacing: 1rem;
}

.card-product {
	padding: var(--spacing);
	border-radius: 8px;
}

/* ❌ RUIM: IDs para tudo, valores hard-coded */
#product {
	padding: 16px;
	border-radius: 8px;
}
```

### HTML

```html
<!-- ✅ BOM: Semântico, acessível -->
<article class="card">
	<h3>Título</h3>
	<p>Descrição</p>
</article>

<!-- ❌ RUIM: Divs genéricos -->
<div id="card_123">
	<div>Título</div>
	<div>Descrição</div>
</div>
```

---

## 🧪 Testes

### Tipos de Teste

1. **Manual** — Você clica e verifica
2. **Automático** — Scripts verificam

### Teste Manual (Atual)

```
1. Busca
   - Digite em português
   - Teste sem acentos
   - Teste com maiúsculas

2. Filtros
   - Categoria filtra?
   - Preço filtra?
   - Pode combinar?

3. Carrinho
   - Adiciona/remove?
   - Persiste reload?
   - WhatsApp formatado?

4. Responsivo
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)

5. Acessibilidade
   - Tab navega elementos?
   - Screen reader funciona?
   - Contraste OK?
```

### Adicionar Teste Automático (Futuro)

```bash
npm install --save-dev jest
npm install --save-dev @testing-library/dom

# Escrever testes
touch src/__tests__/produtos.test.js

# Executar
npm test
```

---

## 📖 Documentação

### Se Adicionar Feature

**Atualize documentação:**

```
docs/
├── 03-USER-GUIDE.md       # Se afeta usuários
├── 04-ARCHITECTURE.md      # Se muda arquitetura
├── 05-DEVELOPER-GUIDE.md   # Se é novo componente
├── 13-FAQ.md              # Se é pergunta comum
└── 15-CHANGELOG.md        # Sempre atualizar
```

### Template de Changelog

```markdown
## [1.0.1] — 2026-04-20

### Added

- 🎨 Dark mode support
- ✨ Hotkey para busca (Ctrl+K)

### Fixed

- 🐛 Carrinho não salva em modo privado
- ❌ Erro XSS em buscas

### Changed

- 📚 Melhorado guia de usuário

### Deprecated

- (nada)

### Security

- 🔐 Atualizado CSP headers
```

---

## 🚀 Revisão de PR

### Nossa Equipe Verifica

- ✅ Código segue padrões
- ✅ Sem bugs óbvios
- ✅ Documentação atualizada
- ✅ Testes passam
- ✅ Performance OK

### Feedback

Se pedirmos mudanças:

1. Faça as alterações
2. Não rebase ou force push (para ver histórico)
3. Novo commit: `git commit -am 'chore: address review feedback'`
4. Push: `git push origin seu-branch`
5. PR atualiza automaticamente

### Aprovação

Quando aprovado:

✅ **Alguém da equipe fará merge**

```bash
# Squash merge (mantém commits limpo)
git commit --squash

# Ou linear history
git rebase -i
```

---

## 🎓 Primeira Contribuição

**Nunca contribuiu antes?**

1. Procure issues com label `good-first-issue`
2. Comente: "Posso trabalhar nisso?"
3. Aguarde aprovação
4. Siga fluxo acima

**Ficamos felizes em ajudar!** 🎉

---

## ❓ Dúvidas?

**Discord/Slack (em breve):** Comunidade para dúvidas  
**Issues:** Abra uma issue com [Question] tag  
**Email:** dev@tupansoft.com.br

---

## 📜 Conhecer Mais

- [Código de Conduta](./16-CODE-OF-CONDUCT.md) — Comportamento esperado
- [Código de Ética](./17-CODE-OF-ETHICS.md) — Princípios
- [Arquitetura](./04-ARCHITECTURE.md) — Como é feito
- [Security](./07-SECURITY.md) — Segurança

---

**Obrigado por contribuir!** ⭐  
Suas contribuições fazem TupãSoft melhor.

---

**Última atualização:** 7 de Abril de 2026
