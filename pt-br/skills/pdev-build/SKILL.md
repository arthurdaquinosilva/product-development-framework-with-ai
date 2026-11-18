---
name: pdev-build
description: Fase 8 do framework pdev — construir uma tarefa planejada com a verificação primeiro, iterar até todos os gates passarem, se auto-revisar e atualizar os artefatos.
disable-model-invocation: true
argument-hint: "<id-da-tarefa>"
---

# Fase 8 — Construir a tarefa $ARGUMENTS

Leia o `AGENTS.md`, depois a tarefa **$ARGUMENTS** no
`docs/implementation-plan.md`, e quaisquer outros artefatos de que a tarefa
precise. Se nenhum id foi dado, escolha a próxima tarefa não marcada cujas
dependências estão todas prontas e me diga qual é.

Se algo de que a tarefa precisa não estiver especificado, pergunte antes de
assumir. Mantenha a mudança restrita a esta tarefa.

1. **Verificação primeiro.** Marque a tarefa como `[~]` no plano. Escreva a
   verificação de aceite da tarefa como um teste automatizado (ou confirme o
   comando que a verifica) e rode — ela deve falhar. Se já passar, me avise:
   ou a tarefa já está pronta, ou a verificação não testa nada.
2. **Construir até ficar verde.** Implemente a tarefa. Itere até a
   verificação de aceite, a suíte completa de testes e todos os gates do
   `AGENTS.md` passarem. **Nunca enfraqueça, pule ou apague um teste ou
   verificação para fazê-lo passar.** Se uma verificação parecer errada, pare e
   me diga por quê.
3. **Auto-revisão.** Revise seu diff como um revisor cético que não o
   escreveu — use uma passada de revisão separada ou um agente revisor, se
   disponível. Compare com a tarefa, as convenções do `AGENTS.md` e o
   `docs/project-scope.md`. Corrija o que encontrar e rode os gates de novo.
4. **Registrar.** Marque a tarefa (`[x]`) no `docs/implementation-plan.md`.
   Registre qualquer decisão ou desvio no `docs/decisions.md` e na seção
   "Desvios" do plano. Atualize qualquer outro artefato que esta tarefa tenha
   deixado errado.
5. **Reporte**, de forma breve:
   - o que mudou (arquivos, comportamento)
   - o resultado dos gates
   - qualquer coisa de que você não tinha certeza ou escolheu sem ser instruído
   - para tarefas com `Revisão: humana`: exatamente quais partes do diff
     precisam da minha atenção linha a linha, e por quê

Depois espere minha revisão antes de commitar (a menos que o `AGENTS.md` diga
que você pode commitar sozinho). Uma tarefa, um commit focado, referenciando o
id da tarefa.

## Pare e pergunte em vez de seguir em frente quando

- a especificação é ambígua ou contradiz outro artefato
- a tarefa está ficando muito maior que o planejado (proponha uma divisão)
- a mudança esbarra num gatilho de revisão humana do `AGENTS.md` que o plano
  não previu
- a única forma de passar numa verificação é mudar a verificação
