---
name: pdev-clarify
description: Fase 2 do framework pdev — interrogar o project-scope.md com perguntas de esclarecimento e depois reescrevê-lo.
disable-model-invocation: true
---

# Fase 2 — Clarificar os requisitos

Leia o `docs/project-scope.md`. Revise-o de forma crítica e me faça perguntas
de esclarecimento. Encontre lacunas, ambiguidades, contradições e coisas que
não foram pensadas — especialmente em relação aos usuários, casos extremos e o
que está explicitamente fora do escopo. Não sugira soluções ainda, e não
concorde comigo só para ser agradável: seu trabalho é encontrar o que eu
deixei passar.

Faça um lote focado de perguntas por vez (no máximo umas cinco), espere minhas
respostas, depois faça o próximo lote. Prefira perguntas cujas respostas mudam
o que vai ser construído.

Quando não tiver mais perguntas de primeira ordem, diga isso, e então atualize
o `docs/project-scope.md` para refletir tudo o que concluímos. Seja conciso.
Preencha "Fora do escopo" e "Questões em aberto"; marque cada questão em
aberto como resolvida ou explicitamente estacionada. Registre qualquer decisão
significativa no `docs/decisions.md`.

## Concluído quando

- [ ] Você não tem mais perguntas de esclarecimento de primeira ordem.
- [ ] "Fora do escopo" está escrito, não apenas implícito.
- [ ] As questões em aberto estão resolvidas ou explicitamente estacionadas.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-mvp`.
