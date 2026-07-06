# 🌐 Visão Geral do Projeto

**Versão:** 3.0.0
**Última atualização:** 6 de Julho de 2026
**Status:** MVP demonstrativo para trabalho acadêmico

---

## Sumário Executivo

O **TupãSoft** é um projeto full-stack criado como estudo acadêmico de uma plataforma de catálogo e atendimento para software. A implementação atual serve como demonstração técnica de navegação, filtros, formulários, autenticação e dashboard, mas **não deve ser apresentada como produto comercial pronto**.

O escopo planejado inclui a ideia de softwares próprios, possível revenda de soluções de parceiros e a hipótese de sistemas personalizados com apoio de IA. Esses pontos permanecem como **planejamento futuro**.

## Objetivos do Projeto

| Objetivo | Descrição |
| --- | --- |
| Demonstração técnica | Mostrar um fluxo completo de catálogo, contato e acompanhamento |
| Organização de produto | Exercitar estrutura de páginas, serviços e persistência |
| Aprendizado acadêmico | Documentar decisões de arquitetura e negócio |
| Evolução futura | Registrar hipóteses como IA, personalização e monetização |

## O que está implementado

- Catálogo de softwares com categorias, busca e filtros
- Cards de produto e modal de detalhes
- Carrinho local no navegador
- Formulário estruturado de contato/pedido
- Comprovante de solicitação com protocolo e etapas previstas
- Login, registro e perfil do usuário
- Dashboard de pedidos e contratos com histórico visual
- Backend em Node.js com API REST e banco PostgreSQL
- Ambiente local com Docker Compose

## O que está planejado

- Integração real de pagamentos
- Publicação em produção com pipeline de deploy
- IA para sistemas personalizados
- Modelo comercial de revenda ou oferta própria
- Camadas extras de suporte, automação e análise

## Stack Técnica

### Frontend

- React 19
- Vite
- JavaScript ES6+
- CSS customizado com variáveis e componentes reutilizáveis

### Backend

- Node.js
- Express
- Sequelize
- PostgreSQL

### Infraestrutura

- Docker
- Docker Compose
- Estrutura preparada para CI/CD futura

## Arquitetura em Camadas

```text
Cliente (React)
  ↓ HTTP/REST
API (Node.js + Express)
  ↓ SQL / Sequelize
Banco (PostgreSQL)
```

## Estrutura Funcional

| Área | Papel |
| --- | --- |
| Home | Apresentação do catálogo e chamada para ação |
| Produto | Detalhes, recursos e modal de interação |
| Pedido | Registro de interesse e comprovante |
| Dashboard | Visualização de contratos e pagamentos previstos |
| Administração técnica | Backend, banco e persistência |

## Observações importantes

- Os valores exibidos no projeto são ilustrativos.
- O projeto não foi concebido para venda imediata.
- A presença de termos como “pedido”, “contrato” e “pagamento” faz parte da simulação de fluxo de negócio.
- A inclusão de IA é uma ideia futura, ainda não implementada.

## Próximos documentos

- [Guia do Usuário](./02-USER-GUIDE.md)
- [Arquitetura da Aplicação](./03-ARCHITECTURE.md)
- [Guia do Desenvolvedor](./04-DEVELOPER-GUIDE.md)
