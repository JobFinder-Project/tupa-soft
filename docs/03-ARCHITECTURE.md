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
│  categories, products, product_features, inquiries,          │
│  contracts, contract_payments                                │
└──────────────────────────────────────────────────────────────┘
```

---

## 🧩 Responsabilidades por Camada

| Camada | Tecnologia | Responsabilidade Principal |
|---|---|---|
| Frontend | React 19 + Vite | Renderização, filtros, navegação e interação do catálogo |
| Backend | Node.js + Express | Expor API, validar entrada, aplicar regras de negócio |
| Persistência | PostgreSQL + Sequelize | Armazenar catálogo, inquéritos, contratos e pagamentos com integridade |
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

## 🔄 Fluxo de Dados (Contato / Formulário - cenário atual e previsto)

As etapas abaixo misturam o comportamento já implementado com passos que ainda fazem parte do desenho do produto.

```
Usuário preenche formulário estruturado na home ou no detalhe do produto
  ├─ Dados pessoais (nome, email, telefone)
  ├─ Produto selecionado
  └─ Mensagem livre da necessidade
        ↓
Frontend chama POST /api/inquiries
        ↓
Backend valida payload (DTO)
        ↓
Service persiste no banco com status = "recebido"
        ↓
Frontend gera comprovante local com protocolo, etapas e parcelamento previsto
        ↓
Usuário acessa /pedidos para consultar contratos e histórico de pagamentos
        ↓
Frontend consulta GET /api/contracts?email=...
```

## 🔄 Fluxo Conceitual de Progresso de Pedido

Este fluxo representa a evolução planejada do atendimento, não uma operação comercial ativa.

```
Equipe TupãSoft recebe inquérito
        ↓
Altera status: "recebido" → "análise"
        └─ O sistema poderia enviar notificação por email ao cliente
        ↓
Após análise: "análise" → "proposta enviada"
        └─ Email com detalhes da proposta, se essa automação for implementada
        ↓
Negociação (email/WhatsApp): status = "negociação"
        └─ Email/WhatsApp com propostas alternativas, em um cenário futuro
        ↓
Acordo alcançado: "negociação" → "contrato assinado"
        └─ Email com contrato para assinatura, caso o fluxo venha a existir
        ↓
Contrato assinado: "contrato assinado" → "acesso liberado"
        └─ Email com credenciais de acesso, quando aplicável
        ↓
Cliente tem acesso: "acesso liberado" → "suporte ativo"
        └─ Suporte por email, se o processo for formalizado
                                ↓
Cliente visualiza todo o histórico no Dashboard
        ├─ Aba de Contratos com status atual
        ├─ Histórico de pagamentos
        ├─ Próximo vencimento
        └─ Link de acesso quando liberado
```

---

## 🌐 Endpoints Principais

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | /health | Health check da API |
| GET | /api/categories | Listagem de categorias |
| GET | /api/products | Listagem de produtos com filtros |
| POST | /api/inquiries | Registro de interesse/contato |
| GET | /api/contracts?email=... | Dashboard de contratos do cliente |

---

## 🗄️ Modelo de Dados (Resumo)

| Tabela | Papel no domínio |
|---|---|
| categories | Agrupa o catálogo por segmento |
| products | Entidade principal de oferta |
| product_features | Detalhes complementares por produto |
| inquiries | Contatos enviados pelos usuários |
| contracts | Protocolo do pedido e status comercial |
| contract_payments | Parcelas e histórico de pagamentos |

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
