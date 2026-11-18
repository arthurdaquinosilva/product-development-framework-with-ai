---
name: pdev-stack
description: Fase 5 do framework pdev — propor e registrar a stack tecnológica, incluindo o tooling de verificação, no tech-stack.md.
disable-model-invocation: true
argument-hint: "[restrições: habilidades, hospedagem, orçamento, prazo]"
---

# Fase 5 — Escolher a stack tecnológica

Leia o `docs/project-scope.md`, o `docs/mvp.md` e o `docs/spikes.md` (se
tiver conteúdo). Minhas restrições: $ARGUMENTS

Se eu não tiver dado restrições, pergunte primeiro: habilidades, hospedagem,
orçamento, prazo, escala esperada e qualquer outra coisa que limite a escolha.

Depois proponha uma stack. Para cada camada — linguagem, framework, banco de
dados, hospedagem, bibliotecas principais e **tooling de verificação** (test
runner, type checker / linter, CI) — dê uma recomendação principal e uma
alternativa, com os trade-offs. Prefira tooling com feedback rápido e
rigoroso: um agente construindo isso vai depender dele o tempo todo. Use o que
os spikes nos ensinaram. Sinalize o que for difícil de mudar depois. Não
infle a stack — menos partes móveis é melhor para um MVP.

Depois que eu decidir, escreva o `docs/tech-stack.md` e registre as escolhas
significativas e difíceis de reverter no `docs/decisions.md`.

## Concluído quando

- [ ] Cada camada tem uma opção escolhida e uma justificativa de uma linha.
- [ ] O tooling de verificação (testes, tipos/lint, CI) está escolhido.
- [ ] As escolhas difíceis de reverter foram identificadas e feitas
      deliberadamente.
- [ ] Eu conseguiria explicar a stack sem a sua ajuda.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-plan`.
