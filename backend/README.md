# Backend - TupãSoft API

API REST do projeto TupãSoft, construída com Node.js ESM, Express e Sequelize, seguindo arquitetura em camadas.

## Stack

- Node.js + Express
- Sequelize (ORM)
- PostgreSQL
- Zod (validação de DTO)
- ESLint

## Estrutura

```text
backend/
├── db/
│   ├── sequelize.js
│   └── sql/init.sql
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dtos/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── scripts/db-init.js
├── .env.example
└── package.json
```

## Variáveis de Ambiente

Copie o exemplo e ajuste:

```bash
cp .env.example .env
```

Campos esperados:

- NODE_ENV
- PORT
- CORS_ORIGIN
- DATABASE_URL

## Comandos

```bash
cd backend
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Produção local

```bash
npm run start
```

### Banco (schema + seed)

```bash
npm run db:init
```

### Qualidade

```bash
npm run lint
npm run lint:fix
```

## Endpoints

Base URL: /api

- GET /health
- GET /categories
- GET /products
- GET /products/:id
- POST /inquiries

## Filtros em Products

Parâmetros suportados em GET /products:

- category
- search
- sort: relevance | price-asc | price-desc | rating | newest
- priceMax
- active
- limit
- offset

## Docker

Este módulo é usado pelo serviço backend do docker-compose na raiz do projeto.

Para subir stack completa, execute no diretório raiz:

```bash
docker compose --env-file .env.compose up --build
```
