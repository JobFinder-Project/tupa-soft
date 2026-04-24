# Frontend - TupãSoft

Aplicação web React com Vite para navegação do catálogo, filtros, carrinho e integração com a API.

## Stack

- React 19
- Vite
- Radix UI
- ESLint

## Estrutura

```text
frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
├── public/
├── vite.config.js
└── package.json
```

## Configuração de API

O frontend consome a API via /api.

- Em desenvolvimento local, o proxy do Vite redireciona /api para o backend.
- Em Docker, o Nginx do container do frontend também encaminha /api para o backend.

## Comandos

```bash
cd frontend
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Pré-visualização do build

```bash
npm run preview
```

### Qualidade

```bash
npm run lint
```

## Portas padrão

- Dev local (Vite): 5173
- Docker (frontend container): 5173

## Docker

Este módulo é usado pelo serviço frontend do docker-compose na raiz do projeto.

Para subir stack completa, execute no diretório raiz:

```bash
docker compose --env-file .env.compose up --build
```
