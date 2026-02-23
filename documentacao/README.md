# Documentacao tecnica do Hub de Produto Vilanova

Esta pasta centraliza a documentacao funcional e tecnica das telas e fluxos criticos do produto.

## Objetivo

1. Preservar contexto de produto e implementacao para manutencao futura.
2. Facilitar onboarding de devs e agentes de IA.
3. Reduzir risco de regressao em features sensiveis (financeiro, autenticacao, suporte, integracoes).

## Estrutura proposta

```text
documentacao/
  README.md
  pagina/
    README.md
    <Nome da Pagina>/
      PRD.md
      RUNBOOK.md
      FLUXO.md
      (opcional) QA_CHECKLIST.md
```

## Padrao obrigatorio por pagina

Toda documentacao por pagina deve conter **sempre**:

1. `PRD.md` (contexto de produto e desenho funcional)
2. `RUNBOOK.md` (operacao, monitoramento, incidentes e recuperacao)
3. `FLUXO.md` (mapa ponta a ponta do funcionamento e integracoes)

## Padrao recomendado para cada pagina

Cada `PRD.md` deve conter, no minimo:

- Contexto e objetivo da tela
- Escopo funcional (o que faz / o que nao faz)
- Jornada do usuario (passo a passo)
- Estados de UI e regras de transicao
- Modelo de dados consumido/gerado
- Integracoes (Edge Functions, APIs externas, storage)
- Regras de seguranca (RLS, permissoes)
- Requisitos nao funcionais
- Observabilidade (logs, eventos, monitoramento)
- Casos de teste (feliz, borda, falha)
- Riscos e proximos passos

Cada `RUNBOOK.md` deve conter, no minimo:

- Dependencias e variaveis de ambiente
- Procedimento de deploy e rollback
- Health checks
- Troubleshooting por sintoma
- Matriz de severidade e plano de resposta
- Checklist pos-incidente

Cada `FLUXO.md` deve conter, no minimo:

- Fluxo ponta a ponta em etapas (usuario -> sistema -> operacao)
- Mapa de estados e transicoes
- Fluxos alternativos e de falha
- Mapeamento de eventos para Edge Functions/integracoes
- Orientacao visual para diagramacao (ex.: Figma AI)

## Convencoes para IA e sustentacao

- Preferir linguagem objetiva e orientada a decisao.
- Sempre registrar dependencias reais (arquivo, tabela, funcao).
- Atualizar a documentacao quando houver alteracao de comportamento.
- Evitar documentacao "marketing"; priorizar operacao, manutencao e confiabilidade.
