---
name: pdev-plan
description: Fase 6 do framework pdev — quebrar o MVP em tarefas verificáveis com verificações de aceite, grupos paralelos e níveis de revisão; escrever o plano de testes.
disable-model-invocation: true
---

# Fase 6 — Planejar o build

Leia o `docs/project-scope.md`, o `docs/mvp.md` e o `docs/tech-stack.md`.
Rascunhe dois artefatos que, juntos, dizem a um agente exatamente o que
construir e como provar que está pronto.

## `docs/implementation-plan.md`

Quebre o MVP em tarefas, agrupadas em fases. Ordene-as para que algo rode de
ponta a ponta o mais cedo possível (um esqueleto funcional primeiro), e para
que cada tarefa construa sobre código que já funciona. Para cada tarefa:

- **Tarefa** — o que é construído. Uma mudança coerente.
- **Verificação de aceite** — um teste ou comando que passa quando a tarefa
  está pronta, descrito com precisão suficiente para escrever o teste a partir
  dele. Não "funciona corretamente".
- **Depende de** — tarefas que precisam entrar antes.
- **Grupo paralelo** — tarefas do mesmo grupo não dependem umas das outras _e_
  não mexem nos mesmos arquivos, então podem ser construídas ao mesmo tempo.
- **Mexe em** — os principais arquivos ou módulos alterados (para detectar
  conflitos).
- **Revisão** — `auto` ou `humana`, com o motivo no caso de `humana`. Marque
  como `humana` tudo que muda formatos de dados ou schemas, autenticação ou
  permissões, dinheiro, interfaces públicas, deploy, ou que apaga dados.

Dimensione as tarefas pela verificabilidade: uma tarefa está certa quando tem
uma verificação de aceite clara e um agente conseguiria terminá-la sem voltar
para perguntar. Divida qualquer coisa maior.

## `docs/test-plan.md`

- Os **gates** que toda mudança precisa passar (teste, lint, type check, …
  como comandos exatos da stack).
- Cada critério de sucesso do MVP do `docs/mvp.md` mapeado para a(s)
  tarefa(s) cujas verificações de aceite o provam — ou marcado como
  verificação manual.
- Os fluxos críticos de usuário que precisam de cobertura de ponta a ponta.
- O que deliberadamente não vamos testar, e por quê.

Depois revise seu próprio plano de forma crítica antes de me mostrar: aponte
as tarefas mais arriscadas, qualquer critério de sucesso com cobertura fraca,
e quaisquer tarefas paralelas que possam colidir. Eu também vou revisar —
esta é a revisão mais importante do framework.

## Concluído quando

- [ ] Toda tarefa tem uma verificação de aceite executável.
- [ ] Todo critério de sucesso do MVP mapeia para a verificação de uma tarefa
      ou para uma verificação manual.
- [ ] Algo roda de ponta a ponta cedo na ordem.
- [ ] Dependências, grupos paralelos e níveis de revisão estão definidos em
      todas as tarefas.
- [ ] Eu li o plano inteiro e aprovei.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-setup`.
