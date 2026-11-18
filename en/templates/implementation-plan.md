# Implementation Plan

<!--
  Phase 6 of the framework (/pdev-plan), kept current through Phase 8 (the
  build loop). Each task is one coherent change with one runnable acceptance
  check — sized so an agent can finish and prove it without coming back to
  ask. Ordered so something runs end-to-end early.
  See FRAMEWORK.md → Phase 6 & 8.
-->

## Legend

- `[ ]` not started · `[~]` in progress · `[x]` done
- **Acceptance check:** the test or command that passes when the task is done.
  Precise enough to write the test from. Never "works correctly".
- **Depends on:** task(s) that must land first.
- **Parallel group:** tasks in the same group don't depend on each other and
  don't touch the same files — they can be built at the same time.
- **Touches:** main files/modules changed (to spot conflicts).
- **Review:** `auto` (gates + a skim of the diff) or `human` (line-by-line
  review — say why). See the human-review triggers in `AGENTS.md`.

---

## Phase A: <!-- e.g. Walking skeleton — something that runs end-to-end -->

### A.1 — <!-- task name -->
- [ ] **Task.** <!-- what gets built -->
- **Acceptance check:** <!-- e.g. `pytest tests/test_cli.py::test_help` passes -->
- **Depends on:** <!-- none / task id -->
- **Parallel group:** <!-- e.g. A1, or "—" -->
- **Touches:** <!-- files / modules -->
- **Review:** <!-- auto | human — reason -->

### A.2 — <!-- task name -->
- [ ] **Task.**
- **Acceptance check:**
- **Depends on:**
- **Parallel group:**
- **Touches:**
- **Review:**

---

## Phase B: <!-- e.g. Core features -->

### B.1 — <!-- task name -->
- [ ] **Task.**
- **Acceptance check:**
- **Depends on:**
- **Parallel group:**
- **Touches:**
- **Review:**

---

## Phase C: <!-- e.g. Polish & hardening -->

### C.1 — <!-- task name -->
- [ ] **Task.**
- **Acceptance check:**
- **Depends on:**
- **Parallel group:**
- **Touches:**
- **Review:**

---

## Deviations from plan

<!-- When the build reveals the plan was wrong, note what changed and why here,
     and split or re-order tasks above. Cross-reference decisions.md. -->

-
