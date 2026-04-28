# 📞 Fluxo de Suporte — TupãSoft

**Versão:** 1.0.0  
**Data:** 28 de Abril de 2026  
**Tipo:** Política operacional  
**Status:** Ativo

---

## 🎯 Objetivo

Definir a estratégia e os fluxos de atendimento ao cliente pós-venda, diferenciando suporte para produtos próprios (TupãSoft) e produtos de terceiros.

---

## 📊 Tipos de Suporte

### 1. Produtos TupãSoft

**Responsabilidade:** Equipe TupãSoft  
**Canal Principal:** Email  
**Canal Secundário:** WhatsApp (apenas emergências)  
**SLA (Service Level Agreement):** Até 24 horas  
**Horário:** Seg-Sex, 8h-18h (Horário de Manaus - UTC-4)

#### Categorias de Suporte TupãSoft

| Categoria | Descrição | Exemplo | Prioridade |
|-----------|-----------|---------|-----------|
| **Técnico** | Problemas de acesso, bugs, erros | "Não consigo acessar minha conta" | Alta |
| **Funcional** | Dúvidas sobre como usar o sistema | "Como gerar relatório de estoque?" | Média |
| **Comercial** | Perguntas sobre plano, fatura, cancelamento | "Qual é meu próximo vencimento?" | Média |
| **Performance** | Sistema lento, falhas | "O sistema está muito lento" | Alta |
| **Segurança** | Questões de dados, LGPD | "Como recuperar senha?" | Crítica |

---

### 2. Produtos de Terceiros

**Responsabilidade:** Fornecedor do software  
**Canal Principal:** Email (encaminhado para fornecedor)  
**Canal Secundário:** WhatsApp (apenas emergências)  
**SLA:** Até 24 horas  
**Horário:** Conforme SLA do fornecedor

#### Papel da TupãSoft

- 🔗 **Intermediária:** Recebe ticket, categoriza e encaminha ao fornecedor
- 📋 **Rastreadora:** Acompanha resposta e notifica cliente
- 🆘 **Fallback:** Se fornecedor não responde em 24h, TupãSoft tenta contato alternativo
- 📊 **Monitoradora:** Avalia SLA do fornecedor e reporta em caso de atraso

---

## 🔄 Fluxo de Atendimento Detalhado

### Passo 1: Recebimento do Ticket

```
Cliente envia email para: suporte@tupasoft.com.br
        ↓
Sistema automático:
  ├─ Envia confirmação de recebimento
  ├─ Gera número de protocolo
  ├─ Armazena no banco de dados
  └─ Notifica equipe via email interno
        ↓
Ticket aparece no dashboard do cliente
  └─ Status: "Recebido em análise"
```

**Informações Coletadas:**
- Nome do cliente
- Email
- Empresa
- Produto (qual software)
- Descrição do problema
- Screenshots (se aplicável)

### Passo 2: Categorização e Roteamento

```
Equipe TupãSoft recebe notificação
        ↓
Classifica o ticket:
  ├─ É produto TupãSoft?
  │   └─ SIM: Escalona para time técnico
  │
  └─ É produto de terceiro?
      └─ SIM: Identifica fornecedor e encaminha
        ↓
Ticket é categorizado por tipo:
  ├─ Técnico (Prioridade: Alta)
  ├─ Funcional (Prioridade: Média)
  ├─ Comercial (Prioridade: Média)
  ├─ Performance (Prioridade: Alta)
  └─ Segurança (Prioridade: Crítica)
```

### Passo 3: Atendimento

#### Se TupãSoft:

```
Técnico analisa o problema
        ↓
Diagnostica a causa
        ↓
Propõe solução:
  ├─ Solução rápida (troubleshooting)
  │   └─ Responde por email em até 24h
  │
  ├─ Solução complexa (bug, development)
  │   ├─ Esclusa para dev team
  │   ├─ Estimativa de resolução
  │   └─ Atualizações diárias ao cliente
  │
  └─ Informação não disponível (LGPD, etc)
      └─ Encaminha para área específica
        ↓
Resolve e encaminha solução
        ↓
Cliente confirma resolução
```

#### Se Terceiro:

```
Equipe identifica fornecedor
        ↓
Formata ticket com contexto da TupãSoft
        ↓
Encaminha via email/API para fornecedor
        ↓
Aguarda resposta (SLA: até 24h)
        ↓
Se resposta recebida:
  ├─ Traduz/adapta se necessário
  └─ Encaminha ao cliente com contexto
        ↓
Se SEM resposta em 24h:
  ├─ Tenta contato alternativo com fornecedor
  ├─ Escalona para gerente de parcerias
  └─ Comunica atraso ao cliente
```

### Passo 4: Comunicação com Cliente

```
Equipe envia email de resposta
        ↓
Cliente recebe via email:
  ├─ Número do protocolo
  ├─ Descrição do problema confirmado
  ├─ Solução ou próximos passos
  ├─ Data estimada (se complexo)
  └─ Email de contato para follow-up
        ↓
Dashboard do cliente atualiza:
  └─ Status: "Respondido em [data/hora]"
```

### Passo 5: Follow-up e Fechamento

```
Passam 3 dias sem resposta do cliente
        ↓
Sistema automático envia email:
  ├─ "Conseguiu resolver o problema?"
  ├─ Se SIM: Fecha ticket
  └─ Se NÃO: Reabre para nova análise
        ↓
Se cliente não responde em 7 dias:
  └─ Ticket é fechado automaticamente com opção de reabrir
```

---

## 📧 Canais de Comunicação

### Email (Principal)

**Endereço:** suporte@tupasoft.com.br  
**Tempo de Resposta:** Até 24 horas úteis  
**Vantagens:**
- ✅ Formal e documentado
- ✅ Arquivo histórico completo
- ✅ Rastreável
- ✅ Permite screenshots e anexos

**Desvantagens:**
- ❌ Mais lento que chat
- ❌ Sem respostas em tempo real

### WhatsApp (Complementar/Emergências)

**Número:** [A DEFINIR]  
**Disponibilidade:** Seg-Sex, 8h-18h + emergências 24/7  
**Uso:**
- 🚨 Emergências críticas (sistema fora, segurança)
- 🔄 Negociação rápida de contrato
- ⏰ Acompanhamento de deadline urgente

**Protocolos:**
- Confirme sempre os dados por email após WhatsApp
- Não tome decisões apenas por WhatsApp
- Priorize email como fonte de verdade

### Dashboard

**Acesso:** Dashboard.tupasoft.com.br  
**Info Disponível:**
- ✅ Histórico de tickets
- ✅ Status atual
- ✅ Datas de respostas
- ✅ Próximas ações

---

## 🏆 Níveis de Prioridade

| Nível | Tempo Resposta | Exemplos | SLA |
|-------|---|---|---|
| **Crítico 🔴** | Imediato | Segurança comprometida, sistema fora | 1h |
| **Alto 🟠** | Até 6h | Bug grave, acesso negado, dados perdidos | 6h |
| **Médio 🟡** | Até 24h | Dúvida funcional, fatura, relatório | 24h |
| **Baixo 🟢** | Até 48h | Sugestão, informação geral | 48h |

---

## 📊 Diferenciação: TupãSoft vs Terceiros

| Aspecto | TupãSoft | Terceiro |
|---------|----------|----------|
| **Responsável** | Equipe própria | Fornecedor |
| **Contato Direto** | Sim | Não (via TupãSoft) |
| **SLA Garantido** | 24h | 24h (conforme fornecedor) |
| **Escalação** | Interna | Para fornecedor |
| **Conhecimento Técnico** | 100% nosso | Do fornecedor |
| **Independência** | Total | Limitada |
| **Custo** | Incluído | Incluído (já negociado) |

### Visibilidade no Catálogo

```
Produto de Terceiro:
┌─────────────────────────────┐
│ Nome do Produto             │
│ Desenvolvido por: ABC Corp  │  ← Sempre visível
├─────────────────────────────┤
│ Preço | Comprar | Detalhes  │
└─────────────────────────────┘

No formulário:
"Suporte fornecido por ABC Corp (24h)"
```

---

## 🎯 KPIs de Suporte

### Métricas Obrigatórias

| Métrica | Meta | Como medir |
|---------|------|-----------|
| **CSAT (Satisfação)** | >85% | Pesquisa após ticket fechado |
| **Tempo Resposta Médio** | <12h | Média de todos os tickets |
| **Resolução 1º Contato** | >60% | Tickets fechados sem escalação |
| **Tempo Resolução** | <48h | Do recebimento ao fechamento |
| **Churn Suporte** | <5% | Clientes que cancelam por suporte ruim |

### Relatórios Mensais

- Volume de tickets por categoria
- Tempo médio de resposta
- Taxa de satisfação
- Tickets pendentes
- Fornecedores com atraso de SLA

---

## ⚠️ Casos Especiais

### Emergência em Produção

```
Cliente relata: "Sistema fora do ar"
        ↓
AÇÃO IMEDIATA (< 5 min):
  ├─ Confirma se é realmente fora do ar
  ├─ Tenta diagnóstico rápido
  ├─ Se TupãSoft: Escalona para tech lead
  ├─ Se Terceiro: Contacta fornecedor urgentemente
  └─ Atualiza cliente a cada 30 min
        ↓
Se não resolvido em 2h:
  └─ Ativa plano de contingência / fallback
```

### Quando é do Fornecedor Responsável

TupãSoft não é responsável por:
- Bugs do software do fornecedor
- Performance do servidor do fornecedor
- Integração com sistemas externos
- Customizações específicas do fornecedor

**Ação:** Encaminhar direto ao fornecedor com ticket devidamente documentado.

---

## 📋 Template de Resposta (Email)

```
Assunto: Re: [PROTOCOLO #12345] Seu Problema - Status da Solução

Olá [NOME],

Obrigado por entrar em contato com a TupãSoft.

**Resumo do Problema:**
[Descrever o que entendemos]

**Análise:**
[O que descobrimos]

**Solução:**
[Passo a passo ou informação]

**Próximos Passos:**
[O que esperar]

**Contato:**
Protocolo: #12345
Email: suporte@tupasoft.com.br
WhatsApp (emergências): [NÚMERO]

Atenciosamente,
[NOME DA EQUIPE]
TupãSoft Soluções
```

---

## 🔐 Segurança e Conformidade

### LGPD

- ✅ Nunca compartilhe senha por email
- ✅ Confirme identidade antes de fornecer dados pessoais
- ✅ Não armazene dados sensíveis em tickets
- ✅ Criptografe comunicações confidenciais

### Confidencialidade

- ✅ Dados de cliente são privados
- ✅ Não mencione clientes em grupo de suporte público
- ✅ Use chaves/IDs em vez de nomes em logs
- ✅ Acesso restrito ao sistema de tickets

---

## 📅 Escalação e Horários

### Horário de Funcionamento

**Seg-Sex:** 08:00 - 18:00 (Horário de Manaus)  
**Sábados:** Suporte Limitado (apenas crítico)  
**Domingos:** Suporte Limitado (apenas crítico)  
**Feriados:** Sem atendimento (resposta no próximo dia útil)

### Escalação Interna

```
Ticket Crítico OU SLA em Risco
        ↓
Técnico não consegue resolver em 30 min
        ↓
Escalona para Tech Lead
        ↓
Tech Lead não consegue em 1h
        ↓
Escalona para CEO/Founder
        ↓
Ativa plano de contingência
```

---

## 🎓 Treinamento da Equipe

### Onboarding Novo Membro

1. **Semana 1:** Entendimento de produtos
2. **Semana 2:** Atendimento supervisionado
3. **Semana 3:** Atendimento independente com review
4. **Semana 4:** Atendimento full autonomia

### Competências Necessárias

- ✅ Empatia e paciência
- ✅ Comunicação clara
- ✅ Conhecimento técnico básico
- ✅ Resolução de problemas
- ✅ Conformidade com LGPD

---

## 📞 Próximo: Plano de Comunicação

Ver [Documento de Cancelamento/Reembolso](./16-CANCELAMENTO-REEMBOLSO.md) (em desenvolvimento)

---

**Última atualização:** 28 de Abril de 2026  
**Revisão Próxima:** Outubro de 2026
