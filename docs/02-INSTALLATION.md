# 🚀 Guia de Instalação

**Versão:** 1.0.0  
**Última atualização:** 7 de Abril de 2026

---

## 📋 Requisitos

### Desenvolvimento Local

- **Sistema Operacional:** Windows, macOS ou Linux
- **Navegador:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Editor de Código:** VS Code, Sublime Text, WebStorm (recomendado: VS Code)
- **Git:** 2.30+ (para clonar o repositório)
- **Node.js/NPM:** Opcional (apenas se usar ferramentas de build)

### Hospedagem/Produção

- **Servidor Web:** Apache, Nginx, IIS ou qualquer servidor estático
- **HTTPS:** Certificado SSL/TLS válido (obrigatório)
- **Domínio:** Seu próprio domínio
- **CDN:** Recomendado para distribuição global (Cloudflare, AWS CloudFront)

---

## 💻 Instalação Local

### Opção 1: Executar localmente (Recomendado para Desenvolvimento)

#### 1. Clonar o repositório

```bash
git clone https://github.com/tupansoft/catalogo.git
cd catalogo
```

#### 2. Abrir no navegador

**Via VS Code (Live Server extension):**

1. Instale a extensão "Live Server" (Ritwick Dey)
2. Clique direito em `index.html`
3. Selecione "Open with Live Server"
4. Navegador abrirá em `http://localhost:5500`

**Via linha de comando (Python):**

```bash
# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

**Via linha de comando (Node.js):**

```bash
# Instale globalmente (uma vez)
npm install -g http-server

# Execute na pasta do projeto
http-server
```

Acesse: `http://localhost:8080`

### Opção 2: Abrir diretamente no navegador

Simplesmente duplo-clique em `index.html` (sem hot reload, mas funciona offline).

---

## 🌍 Deployment em Produção

### Opção A: GitHub Pages (Recomendado para MVP)

#### 1. Fork ou crie um repositório no GitHub

```bash
# No seu repositório local
git remote add origin https://github.com/seu-usuario/catalogo.git
git branch -M main
git push -u origin main
```

#### 2. Ative GitHub Pages

1. Acesse Repository Settings
2. Navegue até "Pages"
3. Source: `main` branch, pasta `/root` ou `/docs`
4. Salve

Seu site ficará em: `https://seu-usuario.github.io/catalogo`

#### 3. Configure domínio customizado (opcional)

1. Em "Pages", adicione seu domínio customizado
2. Configure o DNS (CNAME) no seu registrador
3. Aguarde verificação (até 24h)

### Opção B: Netlify (Recomendado para Produção)

#### 1. Conecte seu repositório

1. Acesse [netlify.com](https://netlify.com)
2. Clique "New site from Git"
3. Autorize GitHub e selecione seu repositório

#### 2. Configure build (se necessário)

- **Build command:** (deixe em branco — sem build necesário)
- **Publish directory:** `.` (raiz do projeto)

#### 3. Deploy

Netlify fará deploy automático a cada push no `main`.

**Domínio público:** `seu-projeto.netlify.app`

#### 4. Configure domínio customizado

1. Em Site settings → Domain management
2. Add custom domain
3. Configure DNS no seu registrador

### Opção C: Vercel

#### 1. Deploy com Vercel CLI

```bash
npm i -g vercel
vercel
```

#### 2. Siga as instruções interativas

Seu site ficará em: `https://seu-projeto.vercel.app`

### Opção D: Servidor Próprio (Apache/Nginx)

#### Apache

```httpd
# /etc/apache2/sites-available/tupansoft.com.conf

<VirtualHost *:80>
    ServerName tupansoft.com
    ServerAlias www.tupansoft.com

    DocumentRoot /var/www/catalogo

    <Directory /var/www/catalogo>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Redirecionar HTTP para HTTPS
    Redirect permanent / https://tupansoft.com/
</VirtualHost>
```

#### Nginx

```nginx
# /etc/nginx/sites-available/tupansoft.com

server {
    listen 80;
    server_name tupansoft.com www.tupansoft.com;

    root /var/www/catalogo;
    index index.html;

    # Cache estático
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tupansoft.com www.tupansoft.com;

    root /var/www/catalogo;
    index index.html;

    # SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/tupansoft.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tupansoft.com/privkey.pem;

    # Performance
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;

    # Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔐 Configuração de Segurança em Produção

### HTTPS com Let's Encrypt

```bash
# Certbot (Recomendado)
sudo certbot certonly --webroot -w /var/www/catalogo -d tupansoft.com -d www.tupansoft.com

# Auto-renew (cron job)
0 3 * * * certbot renew --quiet
```

### Headers HTTP de Segurança

```nginx
# Nginx - adicione ao bloco server
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';" always;
```

### Configurar CORS

```nginx
# Nginx
add_header Access-Control-Allow-Origin "*" always;
```

---

## 📝 Configurações Personalizadas

### Número do WhatsApp

Em `script.js`, linha ~194:

```javascript
const phone = "5592999990000"; // Altere para seu número
```

Também em `index.html` (footer):

```html
<p>📞 (92) 9 9999-0000</p>
<!-- Altere para seu número -->
```

### Metadados do Site

Em `index.html` (head):

```html
<title>TupãSoft — Marketplace de Software | Amazonas, Brasil</title>
<meta name="description" content="Sua descrição aqui..." />
<meta property="og:title" content="TupãSoft" />
<meta property="og:description" content="..." />
```

### Cores do Design System

Em `style.css` (`:root`):

```css
:root {
	--color-primary: #1a6b3c; /* Verde primário */
	--color-dark: #0d3d22; /* Verde escuro */
	--color-accent: #f0ad4e; /* Amarelo */
	--color-bg: #fafafa; /* Fundo claro */
	--color-text: #1f2937; /* Texto escuro */
	/* ... mais cores ... */
}
```

---

## 🧪 Teste a Instalação

### Checklist pós-deploy

- [ ] Site carrega em <3 segundos
- [ ] Busca funciona (teste com "super", "restaurante")
- [ ] Filtros funcionam (categoria, preço)
- [ ] Carrinho persiste ao recaregar a página
- [ ] Modal de detalhes abre corretamente
- [ ] WhatsApp abre com mensagem formatada
- [ ] Responsive design (teste em mobile)
- [ ] Menu hambúrguer funciona (mobile)
- [ ] Acessibilidade (teste com screen reader)
- [ ] Lighthouse: Performance 90+, Accessibility 90+
- [ ] HTTPS ativo e válido
- [ ] Headers de segurança configurados

### Testes de Performance

```bash
# Google PageSpeed Insights
https://pagespeed.web.dev

# GTmetrix
https://gtmetrix.com

# WebPageTest
https://www.webpagetest.org
```

---

## 🚨 Troubleshooting de Instalação

### Problema: "Arquivo não encontrado"

**Solução:**

- Certifique-se de que todos os arquivos (HTML, CSS, JS) estão na mesma pasta
- Verifique o caminho relativo dos imports

### Problema: CORS error

**Solução:**

- Se estiver hospedado em servidor, configure headers CORS
- Evite fazer requisições cross-origin desnecessárias

### Problema: Script não carrega

**Solução:**

- Verifique se `script.js` está no mesmo diretório que `index.html`
- Verifique se não há erro de sintaxe em `script.js` (console do navegador)

### Problema: localStorage não funciona

**Solução:**

- localStorage requer HTTPS em produção (exceção: localhost)
- Verifique se cookies estão habilitados no navegador
- Teste com: `typeof(Storage) !== "undefined"`

---

## 📚 Próximos Passos

1. **Configurar Domínio:** Aponte seu domínio para o servidor
2. **Configurar Email:** Configure `support@tupansoft.com.br`
3. **Configurar Analytics:** Google Analytics, Hotjar
4. **Configurar SMS/WhatsApp API:** Para automação de vendas
5. **Backup:** Configure backup automático do código e dados

---

## 📞 Suporte

Dúvidas sobre instalação?

📧 support@tupansoft.com.br  
💬 [WhatsApp](https://wa.me/5592999990000)  
📋 [FAQ](./13-FAQ.md)
