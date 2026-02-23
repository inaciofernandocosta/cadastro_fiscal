# RUNBOOK operacional - Suporte & Feedback

## 1. Objetivo

Este runbook define como operar, monitorar e recuperar o fluxo de suporte da pagina **Suporte & Feedback** em producao.

Escopo operacional coberto:

- abertura de ticket no app
- persistencia em `user_feedback`
- upload de anexo no bucket `feedback-attachments`
- integracao com ClickUp
- notificacoes por email via `send-email`
- conversa bidirecional (usuario/admin) no thread
- sincronizacao de comentarios ClickUp -> app
- ingestao de resposta por email -> app
- analise de ticket com IA no painel admin

---

## 2. Arquitetura operacional (visao rapida)

1. Usuario abre ticket em `/feedback`.
2. Frontend grava ticket em `user_feedback`.
3. Frontend tenta criar task no ClickUp (`clickup-create-task`).
4. Frontend envia emails de confirmacao (`send-email`).
5. Admin opera tickets em `/admin/feedback`.
6. Comentarios admin podem voltar ao app por:
   - webhook (`clickup-webhook`)
   - sincronizacao manual (`sync-clickup-comments`)
7. Usuario pode responder:
   - no app (atualiza `thread_messages`)
   - por email (`process-email-reply`)

Fluxo resiliente: criacao do ticket base nao deve depender de sucesso de ClickUp/email.

---

## 3. Componentes criticos

## 3.1 Frontend

- `core-wellbeing-app/src/pages/Feedback.tsx`
- `core-wellbeing-app/src/pages/admin/AdminFeedbackPro.tsx`
- `core-wellbeing-app/src/hooks/admin/useFeedbacks.ts`
- `core-wellbeing-app/src/hooks/admin/useFeedbackActions.ts`

## 3.2 Banco e storage

- tabela: `user_feedback`
- tabela: `feedback_activity_log`
- bucket: `feedback-attachments`

## 3.3 Edge Functions

- `clickup-create-task`
- `clickup-reply`
- `clickup-webhook`
- `sync-clickup-comments`
- `process-email-reply`
- `send-email`
- `analyze-feedback`
- (suporte) `clickup-delete-task`, `setup-clickup-webhook`

---

## 4. Variaveis de ambiente (secrets)

## 4.1 Base Supabase

Obrigatorias para Edge Functions:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Usadas por algumas funcoes:

- `SUPABASE_ANON_KEY`
- `APP_URL`

## 4.2 ClickUp

- `CLICKUP_API_KEY`
- `CLICKUP_LIST_ID`
- `CLICKUP_DEV_TEAM` (opcional, default no codigo)

## 4.3 Email (Resend)

- `RESEND_API_KEY`
- `FROM_EMAIL` (opcional)
- `ADMIN_EMAIL` (opcional para notificacao interna)

## 4.4 IA

- `OPENAI_API_KEY` (fallback)
- ou chave ativa na tabela `api_keys` (`service_name='openai'`)

---

## 5. Pre-flight checklist (antes de deploy)

1. Confirmar migrations aplicadas de feedback.
2. Confirmar bucket `feedback-attachments` e policies de storage.
3. Confirmar secrets de ClickUp/Resend/OpenAI.
4. Confirmar rotas ativas:
   - `/feedback`
   - `/admin/feedback`
5. Confirmar que Edge Functions estao deployadas e saudaveis.

---

## 6. Deploy e rollback

## 6.1 Deploy de funcoes (exemplo)

Executar no contexto de `core-wellbeing-app`:

```bash
supabase functions deploy clickup-create-task --project-ref <PROJECT_REF> --no-verify-jwt
supabase functions deploy clickup-reply --project-ref <PROJECT_REF> --no-verify-jwt
supabase functions deploy clickup-webhook --project-ref <PROJECT_REF> --no-verify-jwt
supabase functions deploy sync-clickup-comments --project-ref <PROJECT_REF> --no-verify-jwt
supabase functions deploy process-email-reply --project-ref <PROJECT_REF> --no-verify-jwt
supabase functions deploy send-email --project-ref <PROJECT_REF> --no-verify-jwt
supabase functions deploy analyze-feedback --project-ref <PROJECT_REF> --no-verify-jwt
```

## 6.2 Rollback rapido

1. Re-deploy da versao anterior da funcao afetada.
2. Se indisponivel, desativar funcionalidade nao-critica no frontend (feature flag/caminho de erro).
3. Manter criacao de ticket base (`user_feedback`) funcionando como prioridade.

---

## 7. Health checks operacionais

## 7.1 Smoke test funcional (5 min)

1. Abrir ticket sem anexo em `/feedback`.
2. Validar insert em `user_feedback` com status `pending`.
3. Validar visibilidade em `/admin/feedback`.
4. Validar `clickup_task_id` e `clickup_task_url` (se ClickUp habilitado).
5. Validar email de confirmacao ao usuario.
6. Responder ticket no admin e validar thread no app.

## 7.2 SQL de diagnostico rapido

### Ticket recem-criado
```sql
select id, status, category, clickup_task_id, clickup_task_url, created_at
from user_feedback
order by created_at desc
limit 20;
```

### Estado da conversa
```sql
select id, status, last_message_at, last_message_from, thread_messages, last_admin_reply
from user_feedback
where id = '<feedback_id>';
```

### Primeira resposta e resolucao
```sql
select id, created_at, first_response_at, resolved_at, resolution_time_hours, sla_due_at, sla_breached
from user_feedback
where id = '<feedback_id>';
```

### Activity log
```sql
select feedback_id, action, old_value, new_value, created_at
from feedback_activity_log
where feedback_id = '<feedback_id>'
order by created_at asc;
```

---

## 8. Playbooks de incidente (por sintoma)

## 8.1 Sintoma A: "Ticket enviado no app, mas nao apareceu no admin"

### Causas provaveis
- falha no insert em `user_feedback`
- problema de RLS/perfil do usuario
- consulta admin com filtro ativo excluindo ticket

### Passos
1. Verificar network do frontend no POST/INSERT.
2. Executar SQL de ticket recem-criado.
3. Verificar se usuario tem `user_id` correto no registro.
4. No admin, limpar filtros de status/categoria/prioridade/SLA.

### Mitigacao
- Corrigir policy RLS e/ou payload de insert.
- Validar novamente com novo ticket teste.

---

## 8.2 Sintoma B: "Ticket existe, mas sem task no ClickUp"

### Causas provaveis
- `CLICKUP_API_KEY` invalida/ausente
- `CLICKUP_LIST_ID` incorreta
- erro temporario API ClickUp

### Passos
1. Ver logs da funcao `clickup-create-task`.
2. Checar secrets (`CLICKUP_API_KEY`, `CLICKUP_LIST_ID`).
3. Reexecutar criacao para ticket de teste.

### Mitigacao
- Ajustar secret/list id.
- Criar task manualmente para tickets pendentes criticos e atualizar `clickup_task_id`.

---

## 8.3 Sintoma C: "Admin respondeu, usuario nao recebeu email"

### Causas provaveis
- falha em `send-email`
- `RESEND_API_KEY` invalida
- bloqueio/erro no provedor

### Passos
1. Ver logs de `send-email` e da funcao chamadora (`clickup-webhook` ou `sync-clickup-comments` ou acao admin).
2. Validar retorno HTTP de envio no log.
3. Conferir `FROM_EMAIL` e caixa de spam do destinatario.

### Mitigacao
- Corrigir secret/resend.
- Reenviar resposta manualmente se necessario.

---

## 8.4 Sintoma D: "Comentario no ClickUp nao aparece no app"

### Causas provaveis
- webhook nao configurado/fora do ar
- evento ClickUp nao mapeado no payload
- ultima sincronizacao presa por `last_clickup_comment_id`

### Passos
1. Ver logs de `clickup-webhook`.
2. Executar sincronizacao manual `sync-clickup-comments`.
3. Verificar `last_clickup_comment_id` no `user_feedback`.

### Mitigacao
- Recriar webhook via `setup-clickup-webhook`.
- Ajustar parser de payload se formato mudou.

---

## 8.5 Sintoma E: "Resposta por email do usuario nao entrou no ticket"

### Causas provaveis
- webhook inbound do Resend nao configurado
- assunto sem marcador `[#<feedback_id>]`
- erro na leitura de conteudo em `process-email-reply`

### Passos
1. Ver logs de `process-email-reply`.
2. Confirmar evento `email.received` chegando.
3. Confirmar parser de assunto e fallback por subject.

### Mitigacao
- Corrigir webhook inbound no provedor.
- Manter padrao de assunto nos emails de resposta.

---

## 8.6 Sintoma F: "Analise IA indisponivel no admin"

### Causas provaveis
- sem chave OpenAI (secret ou tabela `api_keys`)
- erro na API OpenAI

### Passos
1. Ver logs de `analyze-feedback`.
2. Validar `api_keys` ativa para `openai`.
3. Validar fallback `OPENAI_API_KEY`.

### Mitigacao
- Corrigir chave e repetir analise.

---

## 9. Matriz de severidade e resposta

## Sev-1 (critico)

Impacto: usuarios nao conseguem abrir ticket (falha insert)

- Acao imediata: restaurar INSERT em `user_feedback`.
- Prioridade: maxima.
- Escalar imediatamente para owner tecnico.

## Sev-2 (alto)

Impacto: ticket abre, mas sem comunicacao (ClickUp/email fora)

- Acao: manter canal app funcional, operar fallback manual no admin.
- Escala: equipe de integracoes.

## Sev-3 (medio)

Impacto: degradacao parcial (atraso sync comentarios)

- Acao: executar sync manual e abrir bug para correção definitiva.

---

## 10. Operacao diaria recomendada

1. Revisar novos tickets e SLA em `/admin/feedback`.
2. Rodar `sync-clickup-comments` quando necessario.
3. Auditar tickets em `awaiting_user` parados.
4. Auditar erros de `send-email` e `clickup-*` nas ultimas 24h.
5. Revisar taxa de resolucao e tempo medio semanalmente.

---

## 11. Checklist de encerramento de incidente

1. Causa raiz identificada e registrada.
2. Correcao aplicada e validada em smoke test.
3. Tickets impactados revisados/normalizados.
4. Documento PRD/RUNBOOK atualizado.
5. Acao preventiva definida (monitoramento/teste/alarme).

---

## 12. Ownership

- Produto: squad Financas/Plataforma (ajustar nome interno)
- Operacao de suporte: admin/master users
- Integracoes externas: responsavel por Supabase Edge + ClickUp + Resend

> Recomendacao: manter este runbook versionado junto ao codigo e atualizar a cada mudanca de fluxo ou dependencia externa.
