# 🔐 Política de Segurança

**Versão:** 1.0.0  
**Última atualização:** 7 de Abril de 2026  
**Status:** Ativo

---

## 🛡️ Compromisso com Segurança

A **TupãSoft** está comprometida em manter a segurança, integridade e confidencialidade de todos os dados. Esta política descreve nossas práticas de segurança e como você pode nos ajudar.

---

## 🎯 Princípios de Segurança

1. **Confidencialidade** — Dados protegidos contra acesso não autorizado
2. **Integridade** — Dados não são alterados indevidamente
3. **Disponibilidade** — Serviço está sempre acessível
4. **Autenticação** — Usuários são quem dizem ser
5. **Autorização** — Usuários só acessam o que devem

---

## 🏗️ Arquitetura de Segurança

### Eliminação de Riscos por Design

Como o TupãSoft é uma **Single Page Application (SPA) estática**, muitos riscos tradicionais são eliminados:

| Risco                   | Mitigação                        |
| ----------------------- | -------------------------------- |
| SQL Injection           | ❌ Não há banco de dados         |
| RCE (Command Injection) | ❌ Não há backend                |
| Autenticação fraca      | ✅ Sem auth necessária (público) |
| Data Breach no servidor | ❌ Sem servidor (estático)       |
| Session Hijacking       | ❌ Sem sessões server-side       |

---

## 🔒 Proteção no Cliente

### 1. HTTPS Obrigatório

**Implementação:**

```nginx
# Nginx — Force HTTPS
server {
  listen 80;
  server_name tupansoft.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name tupansoft.com;

  # SSL Certificate (Let's Encrypt)
  ssl_certificate /etc/letsencrypt/live/tupansoft.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/tupansoft.com/privkey.pem;

  # Protocolo seguro
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
}
```

**Verificação:**

```bash
# Testar SSL
ssl-test https://tupansoft.com

# Via openssl
openssl s_client -connect tupansoft.com:443 -tls1_2
```

### 2. Content Security Policy (CSP)

**Header HTTP:**

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://wa.me;
```

**Proteção contra:**

- ✅ XSS (Cross-Site Scripting)
- ✅ Injection de scripts
- ✅ Roubo de dados via iframes

### 3. X-Content-Type-Options

```
X-Content-Type-Options: nosniff
```

Previne MIME type sniffing.

### 4. X-Frame-Options

```
X-Frame-Options: DENY
```

Previne clickjacking e XSS via iframe.

### 5. Strict-Transport-Security (HSTS)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Força HTTPS por 1 ano.

### Implementação Completa (Nginx)

```nginx
# /etc/nginx/snippets/security-headers.conf

add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://wa.me;" always;
```

---

## 🛡️ Proteção Contra Vulnerabilidades Web (OWASP Top 10)

### 1. Injection

**Risco:** SQL, NoSQL, Command injection  
**Mitigação:**

- ❌ Não há backend → Sem risk de SQL/NoSQL
- ✅ Entrada do usuário nunca é executada
- ✅ Validação em `script.js`:

```javascript
// Validar antes de usar em lógica
const categoryId = CATEGORIES.find((c) => c.id === userInput);
if (!categoryId) return; // Falhar seguramente
```

### 2. Broken Authentication

**Risco:** Senhas fracas, session hijacking  
**Mitigação:**

- ❌ Não há autenticação necessária
- ✅ Carrinho é client-side (localStorage)
- ✅ Se implementar auth futura: usar OAuth, JWT

### 3. Sensitive Data Exposure

**Risco:** Dados vazando em trânsito  
**Mitigação:**

- ✅ HTTPS obrigatório
- ✅ Nenhum dado sensível armazenado no cliente
- ✅ Números de WhatsApp são públicos (por design)

### 4. XML External Entities (XXE)

**Risco:** Injeção via XML  
**Mitigação:**

- ❌ Não usamos XML parsing
- ✅ Apenas JSON simples

### 5. Broken Access Control

**Risco:** Usuário acessa dados que não deveria  
**Mitigação:**

- ✅ Sem backend → Sem dados sensíveis para proteger
- ✅ Dados do catálogo são públicos por design

### 6. Security Misconfiguration

**Risco:** Config padrão insegura  
**Mitigação:**

- ✅ Headers de segurança configurados
- ✅ HTTPS ativo
- ✅ Certificado SSL válido
- ✅ Sem serviços desnecessários

### 7. Cross-Site Scripting (XSS)

**Risco:** Injeção de scripts maliciosos  
**Mitigação:**

- ✅ Nunca usamos `innerHTML` com dados de usuário:

```javascript
// ❌ INSEGURO
element.innerHTML = userInput;

// ✅ SEGURO
element.textContent = userInput;

// ✅ SEGURO (se precisar de HTML)
const sanitized = DOMPurify.sanitize(userInput);
element.innerHTML = sanitized;
```

### 8. Insecure Deserialization

**Risco:** Objeto malicioso é deserializado  
**Mitigação:**

- ✅ Validação ao carregar do localStorage:

```javascript
function loadCart() {
	try {
		const saved = localStorage.getItem("tupansoft_cart");
		if (saved) {
			const cart = JSON.parse(saved);
			// Validar estrutura
			if (Array.isArray(cart)) {
				state.cart = cart;
			}
		}
	} catch (e) {
		console.error("Erro ao carregar carrinho:", e);
		state.cart = []; // Limpar em caso de erro
	}
}
```

### 9. Using Components with Known Vulnerabilities

**Risco:** Dependências com CVE  
**Mitigação:**

- ✅ **Zero dependências externas**
- ✅ HTML5, CSS3, JavaScript vanilla
- ✅ Sem framework vulnerável
- ✅ Análise regular com `npm audit` (se adicionar deps)

### 10. Insufficient Logging & Monitoring

**Risco:** Ataques não são detectados  
**Mitigação:**

- ✅ Google Analytics para comportamento
- ✅ Alertas de erro (Sentry, LogRocket)
- ✅ Monitir uptime com Uptime Robot

---

## 🔑 Gerenciamento de Segredos

### Dados Sensíveis

**O TupãSoft NÃO armazena:**

- ❌ Senhas de usuários
- ❌ Tokens de acesso
- ❌ Informações de cartão de crédito
- ❌ SSN, CPF, dados pessoais

**O TupãSoft EXPÕE (por design público):**

- ✅ Número de WhatsApp
- ✅ Email de contato
- ✅ Catálogo de produtos

### Se Implementar Backend

```bash
# .env (nunca commitar!)
WHATSAPP_API_KEY=xxx
STRIPE_SECRET_KEY=xxx
DATABASE_URL=xxx

# .gitignore
.env
.env.local
```

---

## 🚨 Relatório de Vulnerabilidades

### Encontrou uma falha de segurança?

**NÃO publique em issues públicas.**

📧 **Envie para:** security@tupansoft.com.br

**Inclua:**

1. Descrição da vulnerabilidade
2. Passos para reproduzir
3. Impacto potencial
4. Seu nome (para crédito)

**Prazo:**

- ✅ Confirmação: 24h
- ✅ Patch: 7-30 dias (dependendo da severidade)
- ✅ Disclosure: Coordenado com você

### Programa de Recompensa (Futuro)

Em breve, TupãSoft terá programa de bug bounty via:

- HackerOne
- Bugcrowd

---

## 📊 Certificações e Conformidade

### Atual

- ✅ **HTTPS/TLS 1.2+** — Criptografia em trânsito
- ✅ **WCAG 2.1 AA** — Acessibilidade
- ✅ **LGPD** — Proteção de dados (Brasil)

### Planejado

- 🔜 **ISO/IEC 27001** — Information Security Management
- 🔜 **SOC 2 Type II** — Para clientes enterprise
- 🔜 **Penetration Testing** — Teste de segurança profissional

---

## 🔍 Práticas de Segurança Operacional

### 1. Code Review

- ✅ Todas as mudanças passam por review
- ✅ Linting (ESLint) automático
- ✅ Sem merges sem aprovação

### 2. Dependency Management

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Security updates (críticas)
npm install npm@latest -g
```

### 3. Access Control

- ✅ GitHub: 2FA obrigatória
- ✅ Deploy: Somente maintainers autorizados
- ✅ Logs: Auditados regularmente

### 4. Incident Response

**Plano 24/7:**

1. **Detectar** → Monitores automatizados
2. **Conter** → Tomar serviço offline se necessário
3. **Eradicar** → Patch e fix
4. **Recuperar** → Redeploy
5. **Post-mortem** → Aprender e melhorar

---

## 🔐 Para Usuários

### Sua Responsabilidade

1. **Browser Seguro**
   - ✅ Mantenha navegador atualizado
   - ✅ Extensões de confiança apenas

2. **Reconheça Phishing**
   - ⚠️ Desconfiança de URLs fake
   - ⚠️ Não clique em emails suspeitos

3. **Use HTTPS**
   - ✅ Sempre acesse `https://tupansoft.com`
   - ✅ Nunca HTTP puro

4. **Proteção Local**
   - ✅ Antivírus atualizado
   - ✅ Firewall ativo
   - ✅ Sem compartilhar computador

---

## 📋 Checklist de Segurança (Pré-Deploy)

- [ ] HTTPS ativo e certificado válido
- [ ] Headers de segurança configurados
- [ ] CSP está restrictivo mas funcional
- [ ] Sem hard-coded secrets
- [ ] Sem logs com dados sensíveis
- [ ] localStorage sanitizado
- [ ] CORS configado corretamente
- [ ] Lighthouse Security: 90+
- [ ] npm audit: 0 vulnerabilidades
- [ ] Teste XSS manual
- [ ] Teste CSRF (se aplicável)
- [ ] Teste acesso offline

---

## 📚 Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/)
- [MDN Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [SSL Labs](https://www.ssllabs.com/)

---

## 📞 Contato de Segurança

🛡️ **Security Team**  
📧 security@tupansoft.com.br  
📞 (92) 9 9999-0000  
🔐 [PGP Key](#) — (em breve)

---

**Última revisão:** 7 de Abril de 2026  
**Próxima revisão:** 7 de Julho de 2026
