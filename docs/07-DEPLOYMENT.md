# 🚀 Guia de Deployment

**Versão:** 2.0.0  
**Última atualização:** 23 de Abril de 2026  
**Status:** Ainda não publicado em produção

---

## 📌 Situação Atual

O projeto ainda não foi publicado em ambiente de produção.

A estratégia definida é:
- Publicação futura com pipeline de CI/CD.
- Orquestração com GitHub Actions.
- Deploy de frontend, backend e banco de forma coordenada.

---

## 🧭 Arquitetura de Entrega

```
Código no GitHub
      ↓
GitHub Actions (CI)
      ↓
Validação (lint/build/testes futuros)
      ↓
GitHub Actions (CD)
      ↓
Ambiente de deploy (a definir)
```

---

## 🌍 Ambientes Planejados

| Ambiente | Objetivo | Status |
|---|---|---|
| Desenvolvimento | Trabalho diário da equipe | Ativo |
| Staging | Homologação antes da produção | Planejado |
| Produção | Ambiente público oficial | Não iniciado |

---

## 🧪 Etapas de CI (Planejadas)

| Etapa | Descrição |
|---|---|
| Checkout | Baixar código da branch |
| Lint Frontend | Validar padrão de código do frontend |
| Lint Backend | Validar padrão de código do backend |
| Build Frontend | Gerar artefato web |
| Build Backend | Validar inicialização da API |
| Testes | Execução futura quando suíte existir |

---

## 🚢 Etapas de CD (Planejadas)

| Etapa | Descrição |
|---|---|
| Publicação de artefatos | Disponibilizar build para deploy |
| Atualização de serviços | Aplicar nova versão de frontend e backend |
| Verificação pós-deploy | Health checks e validações básicas |
| Notificação | Resultado para time técnico |

---

## 🔐 Requisitos de Segurança para Deploy

| Item | Diretriz |
|---|---|
| Segredos | Uso de GitHub Secrets |
| Ambiente | Nunca versionar arquivos de segredo |
| Transporte | HTTPS obrigatório em produção |
| Banco | Credenciais distintas por ambiente |
| Logs | Registrar falhas de deploy e rollback |

---

## ✅ Critérios para Primeiro Deploy Público

- Pipeline CI configurado e estável.
- Pipeline CD validado em staging.
- Health check da API funcionando no ambiente alvo.
- Rotina mínima de backup definida.
- Domínio e SSL provisionados.

---

## 📋 Checklist Operacional

- [ ] Workflow de GitHub Actions versionado no repositório
- [ ] Secrets de deploy cadastrados no GitHub
- [ ] Política de aprovação para branch principal
- [ ] Estratégia de rollback documentada
- [ ] Ambiente de staging disponível
- [ ] Observabilidade mínima ativa

---

## 🔄 Fluxo de Release (Resumo)

```
Feature branch
   ↓
Pull Request
   ↓
Validações de CI
   ↓
Merge na branch principal
   ↓
Execução do CD
   ↓
Deploy em ambiente alvo
```

---

## 🗺️ Roadmap de Deploy

| Fase | Meta |
|---|---|
| Fase 1 | CI com lint e build em todas as PRs |
| Fase 2 | CD automatizado para staging |
| Fase 3 | Primeiro deploy em produção |
| Fase 4 | Monitoramento e rollback automatizado |

---

**Anterior:** [Guia do Desenvolvedor](./05-DEVELOPER-GUIDE.md)
