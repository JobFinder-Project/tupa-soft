# Guia do Desenvolvedor

**Versão:** 2.0.0  
**Última atualização:** 23 de Abril de 2026

---

## 🎯 Objetivo

Este guia descreve como o projeto está sendo desenvolvido hoje, com foco no fluxo de trabalho da equipe e nas convenções técnicas atuais.

---

## 🧰 Stack Atual

| Área | Stack |
|---|---|
| Frontend | React 19, Vite, ESLint |
| Backend | Node.js (ESM), Express, Sequelize, Zod |
| Banco | PostgreSQL 16 |
| Infra local | Docker, Docker Compose |
| Qualidade | ESLint (frontend e backend) |
| CI/CD | Planejado com GitHub Actions |

---

## 🧭 Estrutura de Desenvolvimento

| Camada | Organização aplicada |
|---|---|
| Backend | routes → controllers → services → models |
| Frontend | pages → components → hooks → services → utils |
| Documentação | arquivos versionados em docs |

---

## 🖥️ Ambientes de Trabalho

| Ambiente | Uso |
|---|---|
| Local com Docker | Execução integrada (frontend + backend + db) |
| Local sem Docker | Execução separada por módulo |
| Produção | Ainda não publicada |

---

## ✅ Fluxo de Desenvolvimento

1. Criar branch de feature.
2. Implementar mudanças no módulo afetado.
3. Validar lint no frontend e backend.
4. Atualizar documentação quando houver impacto funcional.
5. Abrir PR para revisão.

---

## 📦 Scripts Utilizados com Frequência

| Módulo | Script | Finalidade |
|---|---|---|
| Backend | npm run dev | Desenvolvimento da API |
| Backend | npm run db:init | Recriar schema e dados iniciais |
| Backend | npm run lint | Verificação de padrão de código |
| Frontend | npm run dev | Desenvolvimento da interface |
| Frontend | npm run build | Build de produção da interface |
| Frontend | npm run lint | Verificação de padrão de código |

---

## 🧱 Convenções Técnicas

### Backend

- Controller coordena requisição e resposta.
- Service concentra regra de negócio.
- DTO valida entrada de dados.
- Model representa persistência e relacionamentos.

### Frontend

- Componentes focados por domínio (catálogo, modais, layout, UI).
- Hooks para estado compartilhável e lógica reutilizável.
- Serviço HTTP centralizado para comunicação com API.
- Utilitários isolados para formatação e helpers.

---

## 🔎 Contratos de API Mais Usados

| Endpoint | Entrada | Saída |
|---|---|---|
| `GET /api/products` | filtros de busca/categoria/ordenação | lista de produtos |
| `GET /api/categories` | sem payload | lista de categorias |
| `POST /api/inquiries` | dados de contato e mensagem | confirmação de registro |

---

## 🗄️ Dados de Catálogo (Estado Atual)

| Indicador | Valor atual |
|---|---|
| Categorias | 6 |
| Produtos | 12 |
| Features de produto | 28 |
| Inquéritos seed | 3 |

---

## 🧪 Qualidade e Validação

| Item | Status atual |
|---|---|
| Lint frontend | Ativo |
| Lint backend | Ativo |
| Testes automatizados | Ainda não implementado |
| CI/CD versionado | Em preparação |

---

## 📌 Checklist Antes de PR

- [ ] Lint do frontend executado
- [ ] Lint do backend executado
- [ ] Fluxos principais validados no navegador
- [ ] Endpoints principais validados
- [ ] Documentação ajustada se necessário

---

## 🔜 Próximos Passos Técnicos

- Implementar pipeline de CI no GitHub Actions.
- Definir suíte de testes automatizados.
- Evoluir observabilidade (logs e monitoramento).
- Preparar estratégia de deploy de produção.

---

**Próximo:** [Deployment](./10-DEPLOYMENT.md)
