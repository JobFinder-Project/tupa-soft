# 🏗️ Arquitetura da Aplicação

**Versão:** 2.1.0  
**Última atualização:** 23 de Abril de 2026

---

## 🎯 Visão Arquitetural

O projeto é desenvolvido em arquitetura full-stack, com separação clara entre interface, API e persistência.

```
┌──────────────────────────────────────────────────────────────┐
│                         CLIENTE                              │
│  React 19 + Vite                                             │
│  Componentes, páginas, hooks, serviços HTTP                 │
└───────────────────────┬──────────────────────────────────────┘
                        │ REST/JSON
┌───────────────────────▼──────────────────────────────────────┐
│                         API                                  │
│  Node.js + Express + Zod + Sequelize                        │
│  Rotas, controllers, serviços, validações e middlewares     │
└───────────────────────┬──────────────────────────────────────┘
                        │ SQL
┌───────────────────────▼──────────────────────────────────────┐
│                         DADOS                                │
│  PostgreSQL 16                                               │
│  categories, products, product_features, inquiries           │
└──────────────────────────────────────────────────────────────┘
```

---

## 🧩 Responsabilidades por Camada

| Camada | Tecnologia | Responsabilidade Principal |
|---|---|---|
| Frontend | React 19 + Vite | Renderização, filtros, navegação e interação do catálogo |
| Backend | Node.js + Express | Expor API, validar entrada, aplicar regras de negócio |
| Persistência | PostgreSQL + Sequelize | Armazenar catálogo e inquéritos com integridade |
| Infra local | Docker Compose | Subir frontend, backend e banco de forma integrada |

---

## 📁 Estrutura Atual do Projeto

| Módulo | Caminho | Descrição |
|---|---|---|
| Frontend | frontend/src | Componentes, páginas, hooks, estilos e serviços HTTP |
| Backend | backend/src | Rotas, controllers, services, models, middlewares e DTOs |
| Banco | backend/db/sql/init.sql | Estrutura inicial e carga de dados do catálogo |
| Documentação | docs | Guias técnicos, operação, segurança e negócio |

---

## 🔄 Fluxo de Dados (Produto)

```
Usuário aplica filtro na UI
        ↓
Frontend chama GET /api/products
        ↓
Controller valida query (DTO)
        ↓
Service monta filtros e consulta models
        ↓
Sequelize consulta PostgreSQL
        ↓
API responde JSON
        ↓
Frontend renderiza cards atualizados
```

---

## 🔄 Fluxo de Dados (Inquérito / Formulário de Contato)

```
Usuário preenche formulário no carrinho
  ├─ Dados pessoais (nome, email, empresa, telefone)
  ├─ Produtos selecionados
  └─ Descrição da necessidade
        ↓
Frontend chama POST /api/inquiries
        ↓
Backend valida payload (DTO)
        ↓
Service persiste no banco com status = "recebido"
        ↓
Backend envia email automático ao cliente
  ├─ Comprovante de pedido
  ├─ Número de protocolo
  └─ Link para acompanhar progresso
        ↓
Backend notifica equipe TupãSoft (email interno)
        ↓
API retorna confirmação ao frontend
        ↓
Frontend exibe feedback + acesso ao dashboard
```

## 🔄 Fluxo de Dados (Progresso de Pedido)

```
Equipe TupãSoft recebe inquérito
        ↓
Altera status: "recebido" → "análise"
  └─ Sistema envia notificação por email ao cliente
        ↓
Após análise: "análise" → "proposta enviada"
  └─ Email com detalhes da proposta
        ↓
Negociação (email/WhatsApp): status = "negociação"
  └─ Email/WhatsApp com propostas alternativas
        ↓
Acordo alcançado: "negociação" → "contrato assinado"
  └─ Email com contrato para assinatura
        ↓
Contrato assinado: "contrato assinado" → "acesso liberado"
  └─ Email com credenciais de acesso
        ↓
Cliente tem acesso: "acesso liberado" → "suporte ativo"
  └─ Suporte por email (até 24h)
        ↓
Cliente visualiza todo o histórico no Dashboard
  ├─ Aba de Contratos com status atual
  ├─ Histórico de emails
  ├─ Histórico de pagamentos
  └─ Data de próxima fatura (se aplicável)
```

---

## 🌐 Endpoints Principais

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | /health | Health check da API |
| GET | /api/categories | Listagem de categorias |
| GET | /api/products | Listagem de produtos com filtros |
| POST | /api/inquiries | Registro de interesse/contato |

---

## 🗄️ Modelo de Dados (Resumo)

| Tabela | Papel no domínio |
|---|---|
| categories | Agrupa o catálogo por segmento |
| products | Entidade principal de oferta |
| product_features | Detalhes complementares por produto |
| inquiries | Contatos enviados pelos usuários |

---

## 🔐 Decisões de Segurança

| Área | Diretriz atual |
|---|---|
| Entrada de dados | Validação via DTOs com Zod |
| API | Middlewares para tratamento de erro e logging |
| Infra | Isolamento de serviços com Docker Compose |
| Aplicação | Headers e proteções no backend |

---

## 📌 Estado Atual de Arquitetura

- Arquitetura em camadas está implementada e em uso.
- API e frontend já estão integrados ao banco PostgreSQL.
- O projeto está em evolução contínua com foco em CI/CD e qualidade.

---

**Próximo:** [Guia do Desenvolvedor](./05-DEVELOPER-GUIDE.md)
