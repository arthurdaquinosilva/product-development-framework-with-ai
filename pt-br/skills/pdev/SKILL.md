---
name: pdev
description: Guia do Framework de Desenvolvimento de Produto com IA. Use quando o usuário perguntar em que ponto está no framework, o que fazer em seguida, em qual fase está, ou como funciona o processo pdev.
---

# pdev — guia do framework

Este projeto segue o **Framework de Desenvolvimento de Produto com IA**: 11
fases em 3 estágios que levam um produto da ideia ao lançamento. Seu trabalho
aqui é descobrir em que ponto o projeto está e dizer ao desenvolvedor o
próximo passo. Você é um guia, não quem constrói — não comece a fazer o
trabalho de uma fase a partir daqui.

## Descubra a fase atual

Leia os artefatos de planejamento em `docs/` e o `AGENTS.md`. Um template que
ainda só tem seus `<!-- comentários -->` conta como não iniciado. Depois
encontre a primeira fase cujo "concluído quando" não foi atendido:

| # | Fase | Rodar | Artefato(s) que ela completa |
|---|------|-------|------------------------------|
| 1 | Definir o escopo | _(desenvolvedor sozinho)_ | `docs/project-scope.md` — Problema, Solução, Features rascunhados |
| 2 | Clarificar os requisitos | `/pdev-clarify` | `docs/project-scope.md` — Fora do escopo + Questões em aberto preenchidos |
| 3 | Definir o MVP | `/pdev-mvp` | `docs/mvp.md` |
| 4 | Spikes nas incertezas _(opcional)_ | `/pdev-spike` | `docs/spikes.md` |
| 5 | Escolher a stack | `/pdev-stack` | `docs/tech-stack.md` |
| 6 | Planejar o build | `/pdev-plan` | `docs/implementation-plan.md`, `docs/test-plan.md` |
| 7 | Configurar o projeto | `/pdev-setup` | esqueleto executável, CI, `AGENTS.md` preenchido |
| 8 | Construir (loop) | `/pdev-build <id-da-tarefa>` | tarefas marcadas no `docs/implementation-plan.md` |
| 9 | Verificar e reforçar | `/pdev-harden` | cobertura E2E, achados priorizados, README |
| 10 | Deploy | `/pdev-deploy` | `docs/deployment.md`, deploy no ar |
| 11 | Iterar | `/pdev-iterate` | feedback priorizado; volta para a fase 1 |

A fase 4 é pulada quando o `docs/mvp.md` não marca nenhuma premissa para spike.

Na fase 8, encontre as próximas tarefas: tarefas não marcadas cujas
dependências estão todas marcadas. Liste as que compartilham um grupo
paralelo — elas podem rodar ao mesmo tempo em sessões separadas.

## Reporte

Responda de forma breve:

1. **Onde você está** — a fase, e o que já está feito.
2. **O que falta** — itens de "concluído quando" não atendidos em fases
   anteriores. Não deixe o desenvolvedor avançar por cima de uma lacuna sem
   avisar.
3. **Próximo passo** — o comando a rodar (ex.: `/pdev-build B.2`), ou, na
   fase 1, o que escrever. Uma ou duas frases sobre o objetivo da fase se ele
   for novo nela.

Se os artefatos discordarem entre si ou do código, diga — um artefato
desatualizado é um bug.
