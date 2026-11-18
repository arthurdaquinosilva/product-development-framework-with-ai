---
name: pdev-mvp
description: Fase 3 do framework pdev — definir o MVP, critérios de sucesso testáveis e as premissas arriscadas no mvp.md.
disable-model-invocation: true
---

# Fase 3 — Definir o MVP

Com base no `docs/project-scope.md`, me ajude a definir o MVP — a menor versão
que ainda resolve o problema central e vale a pena lançar.

1. Para cada feature, argumente se ela é realmente MVP ou pode esperar. O
   teste: o produto ainda resolve o problema central sem ela? Se sim, não é
   MVP. Me questione quando eu estiver exagerando.
2. Rascunhe critérios de sucesso concretos o suficiente para virar testes
   automatizados depois ("a sequência está correta na virada do mês", não "as
   sequências funcionam"). O que só uma pessoa consegue verificar, marque como
   **manual**.
3. Liste as premissas em que o MVP está apostando. Para cada uma, indique o
   quão arriscada é e se um protótipo descartável rápido conseguiria testá-la.
   Marque as arriscadas e testáveis como **spike**.

Depois escreva o `docs/mvp.md`: problema central, escopo do MVP, features
adiadas, critérios de sucesso, e premissas e riscos. Registre as escolhas
significativas no `docs/decisions.md`.

## Concluído quando

- [ ] A lista de features do MVP é menor do que meu instinto queria.
- [ ] Todo critério de sucesso é verificável automaticamente, ou está marcado
      como manual.
- [ ] As features adiadas estão registradas para não se perderem.
- [ ] As premissas arriscadas estão listadas, e as que merecem um spike estão
      marcadas.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-spike` se
alguma premissa estiver marcada como spike, senão `/pdev-stack`.
