# Plano de Implementação

<!--
  Fase 6 do framework (/pdev-plan), mantido atualizado durante a Fase 8 (o
  loop de build). Cada tarefa é uma mudança coerente com uma verificação de
  aceite executável — dimensionada para que um agente consiga terminá-la e
  prová-la sem voltar para perguntar. Ordenadas para que algo rode de ponta a
  ponta cedo. Veja FRAMEWORK.md → Fase 6 e 8.
-->

## Legenda

- `[ ]` não iniciada · `[~]` em progresso · `[x]` concluída
- **Verificação de aceite:** o teste ou comando que passa quando a tarefa
  está pronta. Precisa o suficiente para escrever o teste a partir dela.
  Nunca "funciona corretamente".
- **Depende de:** tarefa(s) que precisa(m) entrar antes.
- **Grupo paralelo:** tarefas do mesmo grupo não dependem umas das outras e
  não mexem nos mesmos arquivos — podem ser construídas ao mesmo tempo.
- **Mexe em:** principais arquivos/módulos alterados (para detectar conflitos).
- **Revisão:** `auto` (gates + uma olhada no diff) ou `humana` (revisão linha
  a linha — diga por quê). Veja os gatilhos de revisão humana no `AGENTS.md`.

---

## Fase A: <!-- ex: Esqueleto — algo que rode de ponta a ponta -->

### A.1 — <!-- nome da tarefa -->
- [ ] **Tarefa.** <!-- o que é construído -->
- **Verificação de aceite:** <!-- ex: `pytest tests/test_cli.py::test_help` passa -->
- **Depende de:** <!-- nenhuma / id da tarefa -->
- **Grupo paralelo:** <!-- ex: A1, ou "—" -->
- **Mexe em:** <!-- arquivos / módulos -->
- **Revisão:** <!-- auto | humana — motivo -->

### A.2 — <!-- nome da tarefa -->
- [ ] **Tarefa.**
- **Verificação de aceite:**
- **Depende de:**
- **Grupo paralelo:**
- **Mexe em:**
- **Revisão:**

---

## Fase B: <!-- ex: Features principais -->

### B.1 — <!-- nome da tarefa -->
- [ ] **Tarefa.**
- **Verificação de aceite:**
- **Depende de:**
- **Grupo paralelo:**
- **Mexe em:**
- **Revisão:**

---

## Fase C: <!-- ex: Polimento e reforço -->

### C.1 — <!-- nome da tarefa -->
- [ ] **Tarefa.**
- **Verificação de aceite:**
- **Depende de:**
- **Grupo paralelo:**
- **Mexe em:**
- **Revisão:**

---

## Desvios do plano

<!-- Quando o build revelar que o plano estava errado, anote aqui o que mudou e
     por quê, e divida ou reordene as tarefas acima. Referencie o
     decisions.md. -->

-
