---
name: pdev-setup
description: Fase 7 do framework pdev — criar o scaffold do projeto, ligar os gates no CI e preencher o AGENTS.md.
disable-model-invocation: true
---

# Fase 7 — Configurar o projeto

Leia o `docs/tech-stack.md`, o `docs/implementation-plan.md` e o
`docs/test-plan.md`.

1. **Scaffold** do projeto conforme a stack: estrutura de diretórios,
   manifesto de dependências, formatter/linter, type checker se a stack tiver
   um, test runner, um ponto de entrada mínimo executável e `.gitignore`.
   Mantenha mínimo — nenhuma feature ainda. Não sobrescreva os artefatos de
   planejamento em `docs/`.
2. **Gates.** Faça todos os comandos de gate do `docs/test-plan.md` funcionarem
   e passarem (um teste placeholder serve). Adicione CI que roda os mesmos
   gates a cada push. Se eu preferir não configurar CI ainda, registre isso no
   `docs/decisions.md`.
3. **AGENTS.md.** Preencha todas as seções do `AGENTS.md` na raiz do
   repositório: visão geral, comandos para rodar, os comandos de gate como
   definição de pronto, convenções, regras de autonomia, gatilhos de revisão
   humana, proteções e o mapa de artefatos. Mantenha curto — ele é lido no
   início de toda tarefa. Remova os comentários do template. Deixe o
   `CLAUDE.md` como o import `@AGENTS.md`.
4. Atualize o `docs/tech-stack.md` ou o `docs/decisions.md` se algo mudou
   durante a configuração, e me mostre o resultado e os comandos exatos para
   verificar.

Faça o commit depois que eu olhar.

## Concluído quando

- [ ] O esqueleto roda e todos os gates passam.
- [ ] O CI roda os mesmos gates e está verde (ou pulá-lo é uma decisão
      registrada).
- [ ] O `AGENTS.md` está preenchido, incluindo gates, regras de autonomia,
      gatilhos de revisão e o mapa de artefatos.
- [ ] Está tudo commitado.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-build`
com o id da primeira tarefa do plano.
