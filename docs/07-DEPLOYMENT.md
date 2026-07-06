# 🚀 Guia de Deployment

**Versão:** 2.0.0
**Última atualização:** 6 de Julho de 2026
**Status:** Execução local disponível; produção ainda não publicada

---

## Situação atual

O projeto funciona como ambiente local para demonstração e desenvolvimento acadêmico. O deploy em produção permanece como planejamento futuro.

## Como o projeto é executado hoje

- Frontend e backend sobem localmente com Docker Compose
- O banco de dados é preparado a partir dos scripts do projeto
- O fluxo é pensado para demonstração, não para operação pública

## Cenário futuro

Se o projeto evoluir para publicação real, será necessário definir:

- Ambiente de staging
- Pipeline de CI/CD
- Domínio público e SSL
- Monitoramento e backup
- Estratégia de atualização dos serviços

## O que não deve ser assumido como pronto

- Deploy em produção
- Escala comercial
- Rotina de rollback automatizada
- Infraestrutura pública com usuários reais

## Regras de segurança

- Não versionar segredos
- Separar variáveis por ambiente
- Usar HTTPS quando houver publicação pública
- Registrar falhas para análise posterior

## Resumo

Por enquanto, a documentação deve tratar o deployment como uma base local de estudo e não como uma operação ativa de produção.
