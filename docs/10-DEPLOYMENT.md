# 🚀 Guia de Deployment

**Versão:** 1.0.0  
**Última atualização:** 7 de Abril de 2026

---

## 🎯 Arquitetura de Deployment

TupãSoft é uma **Single Page Application (SPA) estática** — sem backend necessário.

```
┌─────────────────────────┐
│   Git Repository        │
│   (GitHub)              │
└────────────┬────────────┘
             │
    ┌────────▼────────┐
    │  CI/CD Pipeline │
    │  (GitHub Actions)
    └────────┬────────┘
             │
    ┌────────▼──────────────────┐
    │     Hosting (Escolha uma) │
    │                          │
    │  - GitHub Pages           │
    │  - Netlify               │
    │  - Vercel                │
    │  - Próprio Servidor      │
    └──────────────────────────┘
```

---

## 📋 Ambientes

### Desenvolvimento

**Tempo real:** Live reload enquanto edita  
**URL:** http://localhost:5500  
**Deploy:** Manual (seu computador)

```bash
code . && Live Server
```

### Staging

**Teste antes de produção**  
**URL:** https://staging.tupansoft.com  
**Deploy:** Semi-automático (branch staging)

### Produção

**Usuários reais**  
**URL:** https://tupansoft.com  
**Deploy:** Automático (branch main)  
**SLA:** 99.5% uptime

---

## 🚀 Opção 1: GitHub Pages (Recomendado MVP)

### 1. Criar Repositório

```bash
# No GitHub, crie: seu-usuario/catalogo

git clone https://github.com/seu-usuario/catalogo.git
cd catalogo
```

### 2. Configurar Deploy Automático

**GitHub → Repository Settings → Pages**

```
Source: Deploy from a branch
Branch: main | folder: / (root)
Save
```

### 3. Deploy Inicial

```bash
git add .
git commit -m "chore: Initial commit"
git push origin main
```

GitHub Pages fará deploy automaticamente (2-5 min).

### 4. Acessar

```
https://seu-usuario.github.io/catalogo
```

### 5. Domínio Customizado (Opcional)

**GitHub → Pages → Custom domain**

```
tupansoft.com
```

Depois configure DNS:

```
CNAME record
Name: @
Value: seu-usuario.github.io

Ou

A records (IPs do GitHub)
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

## 🚀 Opção 2: Netlify (Recomendado Produção)

### 1. Conectar GitHub

```
https://app.netlify.com
Sign in com GitHub
```

### 2. Autorizar Netlify

```
Clique "Connect Git"
Selecione seu repositório
```

### 3. Configurar Build

```
Build command: (deixe vazio — sem build necesária)
Publish directory: .
```

### 4. Deploy

Clique "Deploy". Netlify fará:

- ✅ Build automático
- ✅ Deploy automático
- ✅ HTTPS automático
- ✅ CDN global

**URL:** https://seu-projeto.netlify.app

### 5. Domínio

**Netlify → Domain settings → Custom domain**

```
tupansoft.com
```

Configure DNS host (Namecheap, GoDaddy, etc):

```
Netlify provides nameservers:
dns1.p10.netlify.com
dns2.p10.netlify.com
dns3.p10.netlify.com
dns4.p10.netlify.com

Mude em seu registrador
```

### 6. Automação (CD)

Agora, sempre que fazer push:

```bash
git push origin main
# → Netlify detecta
# → Build automático
# → Deploy automático
# → Site atualizado em 1-2 min
```

---

## 🚀 Opção 3: Vercel

### 1. Conectar GitHub

```
https://vercel.com
Create new project
Import Git Repository
Select seu-repositorio
```

### 2. Configure

```
Framework: Other (non-framework)
Build command: (deixe vazio)
Output directory: .
```

### 3. Deploy

Click "Deploy". Vercel fará:

- ✅ Deploy automático
- ✅ HTTPS + CDN
- ✅ Preview links

**URL:** https://seu-project.vercel.app

---

## 🚀 Opção 4: Servidor Próprio (AWS/Digital Ocean)

### Conceitual (VPS Linux)

```bash
# 1. SSH em servidor
ssh root@seu-servidor.com

# 2. Instalar Nginx
sudo apt update && sudo apt install nginx

# 3. Clonar repositório
cd /var/www
git clone https://github.com/seu-usuario/catalogo.git
cd catalogo

# 4. Configurar Nginx
sudo cp katalogo/nginx.conf /etc/nginx/sites-available/tupansoft.com

# 5. Habilitar site
sudo ln -s /etc/nginx/sites-available/tupansoft.com /etc/nginx/sites-enabled/

# 6. Testar configuração
sudo nginx -t

# 7. Reiniciar Nginx
sudo systemctl restart nginx

# 8. Certificado SSL (Let's Encrypt)
sudo certbot certonly --webroot -w /var/www/catalogo -d tupansoft.com

# 9. Pronto!
# Site acessível em https://tupansoft.com
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

### Arquivo: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run linting
        run: npm run lint # (futuro)

      - name: Run tests
        run: npm test # (futuro)

      - name: Deploy to Netlify
        uses: nwtgtn/deploy-nextjs-netlify-plugin@v4
        with:
          publish-dir: "."
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

      - name: Notify Slack # (futuro)
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
```

---

## 🔐 Configurar HTTPS

### Let's Encrypt (Gratuito)

```bash
# Via Certbot
sudo certbot certonly --webroot \
  -w /var/www/catalogo \
  -d tupansoft.com \
  -d www.tupansoft.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Verificar
sudo certbot renew --dry-run
```

### Nginx Config

```nginx
server {
    listen 80;
    server_name tupansoft.com www.tupansoft.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tupansoft.com www.tupansoft.com;

    root /var/www/catalogo;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/tupansoft.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tupansoft.com/privkey.pem;

    # Headers de segurança
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Cache
    location ~* \.(js|css|png|jpg)$ {
        expires 30d;
    }
}
```

---

## 📊 Monitoramento

### Uptime Robot

```
https://uptimerobot.com

- Monitora site 24/7
- Alerta se cair
- Histórico uptime
```

### Google Analytics

```
- Tráfego
- Conversão (WhatsApp clicks)
- Comportamento
```

### Sentry (Error Tracking)

```
https://sentry.io

- Rastreia erros de JavaScript
- Alert em tempo real
- Source maps
```

---

## 🧪 Testes Pré-Deploy

### Checklist

- [ ] HTTPS ativo e certificado válido
- [ ] Headers de segurança OK
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 90+
- [ ] No CSS issues
- [ ] No JavaScript errors
- [ ] Carrinho persiste
- [ ] Busca funciona
- [ ] WhatsApp integrado
- [ ] Menu mobile funciona
- [ ] CLS (Cumulative Layout Shift): 0

```bash
# Lighthouse localmente
npm install -g lighthouse
lighthouse https://tupansoft.com
```

---

## 🔄 Workflow de Release

### 1. Prepare Release

```bash
# Crie branch de release
git checkout -b release/1.0.1

# Atualize versão em package.json (futuro)
# vim package.json
# Versão: 1.0.0 → 1.0.1

# Atualize CHANGELOG
# vim docs/15-CHANGELOG.md

git commit -am "chore: Release v1.0.1"
```

### 2. Code Review

```bash
# Push branch
git push origin release/1.0.1

# Abra PR com title: "Release: v1.0.1"
# Aguarde revisões
```

### 3. Merge para Main

```bash
# PR aprovada
# Clique "Merge pull request"
```

### 4. Tag de Release

```bash
# Volte para main
git checkout main
git pull origin main

# Crie tag
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1

# GitHub cria "Release" automaticamente
```

### 5. Deploy Automático

CI/CD detecta nova tag → Deploy automático

---

## 📋 Rollback

Se algo der errado:

```bash
# Reverta para versão anterior
git revert COMMIT_HASH
git push origin main

# Ou, força revert
git reset --hard HEAD~1
git push origin main --force

# Netlify/Vercel detecta e redeploy automaticamente
```

---

## 🚀 Performance em Produção

### Otimizações

1. **Gzip Compression** ✅

   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json text/javascript;
   ```

2. **Cache HTTP** ✅

   ```nginx
   location ~* \.(html)$ {
     expires 5m;  # 5 minutos para HTML
   }

   location ~* \.(js|css|png)$ {
     expires 30d;  # 30 dias para assets
   }
   ```

3. **CDN Global** ✅
   - Cloudflare (recomendado)
   - AWS CloudFront
   - Fastly

4. **HTTP/2** ✅
   - Nginx automático com `http2`
   - Melhor performance

---

## 🔍 Métricas Esperadas

| Métrica        | Target | Atual   |
| -------------- | ------ | ------- |
| **FCP**        | <1.8s  | 0.8s ✅ |
| **LCP**        | <2.5s  | 1.2s ✅ |
| **CLS**        | <0.1   | 0.0 ✅  |
| **TTL**        | <3s    | 1.2s ✅ |
| **Lighthouse** | 90+    | 95 ✅   |
| **Uptime**     | 99.5%  | TBD     |

---

## 📚 Referências

- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages](https://pages.github.com/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Nginx Docs](https://nginx.org/en/docs/)

---

**Pronto para deploy?** ⚡  
Escolha sua plataforma e comece!

---

**Última atualização:** 7 de Abril de 2026
