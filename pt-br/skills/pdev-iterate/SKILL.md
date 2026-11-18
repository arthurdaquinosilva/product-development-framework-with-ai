---
name: pdev-iterate
description: Fase 11 do framework pdev — priorizar feedback e dados de uso, definir o escopo da próxima iteração e atualizar os artefatos.
disable-model-invocation: true
argument-hint: "[feedback, ou o caminho para ele]"
---

# Fase 11 — Iterar

Aqui estão o feedback e os dados de uso do produto em produção: $ARGUMENTS

Se não houver nada acima, me peça.

1. Leia o `docs/project-scope.md`, o `docs/mvp.md` (principalmente a lista de
   adiados) e o `docs/decisions.md`.
2. Priorize o feedback em **bugs**, **melhorias** e **novas features**. Para
   cada um, indique o impacto para o usuário, o esforço aproximado, e se já
   estava na lista de adiados ou contradiz uma decisão anterior.
3. Recomende no que a próxima iteração deve focar, e o que precisa de escopo
   antes que alguém construa.
4. Para cada bug a corrigir: adicione uma tarefa no
   `docs/implementation-plan.md` cuja verificação de aceite seja um teste que
   reproduz o bug.
5. Depois que eu decidir: atualize o `docs/project-scope.md` e a lista de
   adiados no `docs/mvp.md`, e registre as decisões no `docs/decisions.md`.

## Concluído quando

- [ ] O feedback está priorizado, não numa pilha.
- [ ] Todo bug a corrigir tem uma tarefa que começa com um teste que o reproduz.
- [ ] O foco da próxima iteração está decidido e com escopo.
- [ ] O `docs/project-scope.md` e a lista de adiados refletem a realidade atual.

Termine me dizendo o próximo passo: bugs vão direto para `/pdev-build`; escopo
novo volta por `/pdev-clarify` e `/pdev-mvp`.
