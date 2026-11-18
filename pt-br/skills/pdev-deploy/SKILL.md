---
name: pdev-deploy
description: Fase 10 do framework pdev — escrever o deployment.md, automatizar o caminho de release e verificar um deploy real com health checks executáveis.
disable-model-invocation: true
---

# Fase 10 — Fazer o deploy

Leia o `docs/tech-stack.md` e o `AGENTS.md`.

1. Rascunhe o `docs/deployment.md`: ambiente alvo, processo de build e release
   passo a passo, variáveis de ambiente necessárias e como os segredos são
   gerenciados (só os nomes — nunca os valores), o procedimento de rollback, e
   os health checks que confirmam um bom deploy.
2. Torne os health checks **executáveis** — um script ou comando que sai com
   código diferente de zero quando o deploy não está saudável.
3. Automatize o caminho de release (CI/CD ou um único script) para que deploys
   futuros sejam repetíveis.
4. Prepare o primeiro deploy real, mas **deixe que eu dispare ou aprove o
   release de produção em si** — ele é voltado para fora e pode ser difícil de
   desfazer. Depois, rode os health checks e reporte.
5. Registre as escolhas significativas (hospedagem, gestão de segredos,
   estratégia de release) no `docs/decisions.md`.

## Concluído quando

- [ ] O produto é acessível pelos usuários pretendidos.
- [ ] Fazer deploy de novo é um processo repetível e automatizado.
- [ ] O rollback está escrito, e os health checks rodam como um comando.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-iterate`
quando houver feedback.
