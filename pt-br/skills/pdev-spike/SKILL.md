---
name: pdev-spike
description: Fase 4 do framework pdev — responder premissas arriscadas com protótipos descartáveis e registrar as descobertas no spikes.md.
disable-model-invocation: true
argument-hint: "[pergunta para o spike]"
---

# Fase 4 — Spikes nas incertezas

Leia o `docs/mvp.md` e encontre as premissas marcadas como **spike**. $ARGUMENTS

1. Proponha de uma a três perguntas que mais valem ser respondidas, em forma
   de sim/não ou "quão bem", e qual seria o menor protótipo que responde cada
   uma. Espere minha confirmação.
2. Para cada pergunta confirmada, construa o menor protótipo possível num
   local de rascunho (um diretório `spikes/` ou um branch descartável) — nunca
   na árvore de código real. Ignore a qualidade do código por completo;
   otimize para aprender rápido. Não construa nada que a pergunta não precise.
3. Rode e me mostre o resultado. Onde for preciso julgamento ("isso parece
   certo?"), me diga exatamente como experimentar eu mesmo.
4. Registre cada spike no `docs/spikes.md`: a pergunta, o que foi tentado, a
   descoberta, e o que ela significa para o MVP ou a stack. Atualize as
   premissas no `docs/mvp.md`, e registre o que o spike resolveu no
   `docs/decisions.md`.
5. Apague o código do protótipo (ou confirme comigo que ele está isolado e não
   vai ser importado pelo projeto real).

## Concluído quando

- [ ] Cada spike respondeu sua pergunta — sim, não, ou "não desse jeito".
- [ ] As descobertas estão no `docs/spikes.md`, e o `docs/mvp.md` as reflete.
- [ ] O código do spike foi apagado ou está claramente isolado.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-stack`.
