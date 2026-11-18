# Worked Example

A complete, end-to-end walkthrough of the framework applied to a small project:
**a command-line habit tracker**. Every phase is shown — the commands, agent
exchanges, filled-in artifacts, and completion checks. The artifacts are
abbreviated (real ones have more detail) but the shape and content are faithful.

This is markdown only on purpose. The framework doesn't ship sample code; the
agent generates that.

The project was set up with `pdev-init`, so the templates are in `docs/` and the
phase skills are available as `/pdev-…` commands. At any point, `/pdev` reports
which phase the project is in and what to run next.

---

## Stage 1 — Plan

### Phase 1: Define the scope

**What you do.** Open `docs/project-scope.md` and fill in what's in your head.
Be rough. No agent yet — this phase is just you.

**First draft (written by you, before any agent involvement):**

> **Problem.** I keep forgetting which habits I've done each day and lose track
> of my streaks. Apps feel too heavy; I want something I can use from the
> terminal without switching contexts.
>
> **Solution.** A CLI where I can define habits, check them off each day, and
> see my current streaks.
>
> **Users.** Me, and developers like me who live in the terminal.
>
> **Features.** Add habits · mark habits done · see streaks · remove habits.
>
> **Out of scope.** *(left blank — will fill in with agent)*
>
> **Open questions.** *(left blank)*

**Done when:**
- [x] You can state the problem in one or two sentences.
- [x] You've listed the features you imagine, even half-formed ones.

---

### Phase 2: Clarify the requirements

**Run:** `/pdev-clarify`

**Agent's first batch of questions:**

> 1. What counts as a "day"? Calendar day in local time, or a rolling 24-hour
>    window from whenever you last logged?
> 2. If you miss a day, does the streak reset to zero, or can you back-fill?
> 3. Can a habit have a non-daily frequency — every two days, weekdays only?
> 4. Is this single-user only, or should it work across multiple machines?
> 5. What should happen if two people share the same machine?

**Your answers:**

> 1. Calendar day, local midnight.
> 2. Streak resets — no back-filling for now.
> 3. Daily only. Anything else is out of scope.
> 4. Single machine. No sync.
> 5. Out of scope — single-user tool.

**Agent's second batch:**

> 6. When you add a new habit, does the streak start at 0, or at 1 on the first
>    day you log it?
> 7. If you run `done` twice for the same habit on the same day — error or
>    idempotent?
> 8. When you remove a habit, what happens to its historical log — deleted or
>    kept?

**Your answers:**

> 6. Streak starts counting from the first time you mark it done — so 0 before
>    any log, 1 after the first.
> 7. Idempotent — safe to run twice.
> 8. Removing a habit is probably deferred from the MVP entirely; I'll decide
>    later.

The agent reports it has no more first-order questions and rewrites the file.

**Resulting `project-scope.md`:**

> **Problem.** People who want to build daily habits lose track of their streaks
> and have no quick way to log a habit from where they already work — the
> terminal.
>
> **Solution.** A small CLI to define habits, mark them done each day, and see
> current streaks.
>
> **Users.** Developers and terminal-comfortable people building personal
> habits. Single-user, single-machine.
>
> **Features.** Add a habit · mark a habit done for today (idempotent — running
> it twice the same day counts once) · view current streaks · remove a habit.
>
> **Out of scope.** Reminders/notifications · multi-device sync · any GUI ·
> sub-daily or non-daily habits · back-filling missed days · multi-user support.
>
> **Open questions.** What happens to logged data when a habit is removed?
> → parked; deferred with the remove feature itself.

*The two rounds of questions surfaced the "what is a day" ambiguity, the
idempotent-logging rule, and pushed back-filling out of scope — all decisions
that would have caused churn if left until the build.*

**Done when:**
- [x] The agent has no more first-order clarifying questions.
- [x] "Out of scope" is written down, not just implied.
- [x] Open questions are either resolved or explicitly parked.

---

### Phase 3: Define the MVP

**Run:** `/pdev-mvp`

**Key exchange:**

> **Agent:** "Remove habits" — I'd defer this. The core problem is *losing
> track of streaks and logging habits*. A user can simply ignore a habit they've
> given up on; the product still solves the problem. Including delete also means
> deciding what happens to history, which is a scope risk for an MVP.
>
> **You:** Fair. Defer it.
>
> **Agent:** Your success criterion "streaks are correct" can't be tested as
> written. Can I split it into the specific cases that matter — consecutive
> days, a missed day, same-day duplicates, and a month boundary?
>
> **You:** Yes.
>
> **Agent:** One assumption worries me: you expect to use this for years, and
> a single JSON file gets rewritten on every `done`. Is it still instant with
> 50+ habits and a few years of history? That's cheap to test before we
> commit to the format. I'd mark it for a spike.

**Resulting `mvp.md`:**

> **Core problem the MVP must solve.** Log a habit and see whether the streak
> is alive — without friction.
>
> **In the MVP.** Add a habit · mark done for today · view streaks.
>
> **Deferred.** Remove habits · back-fill missed days · stats or history beyond
> the current streak.
>
> **Success criteria.**
> - Streak is 0 before any log, 1 after the first, +1 per consecutive day.
> - A missed day resets the streak to 0.
> - Logging the same habit twice on one day counts once.
> - Streak is correct across a month boundary (Apr 30 → May 1).
> - Data survives between runs.
> - A new user can add a habit and log it in under 10 seconds. *(manual)*
>
> **Assumptions & risks.**
> - Users are willing to adopt a CLI tool. *(risk accepted — it's for us)*
> - A single JSON file stays fast with 50+ habits and years of history. **(spike)**

**Done when:**
- [x] The MVP feature list is shorter than your instinct wanted it to be.
- [x] Every success criterion is checkable automatically, or marked manual.
- [x] Deferred features are recorded so they aren't lost.
- [x] Risky assumptions are listed, and the ones worth a spike are marked.

---

### Phase 4: Spike the unknowns

**Run:** `/pdev-spike`

The agent proposes one question — *"Does loading, updating, and saving a JSON
store with 100 habits × 5 years of daily logs stay under 100 ms?"* — and a
20-line script in `spikes/` that generates that much fake data and times a
load-modify-save cycle. You confirm.

**Result:** about 180,000 dates, a 3.4 MB file, ~45 ms per cycle on a laptop.
Comfortably fast. But the spike surfaced a second finding nobody had asked
about: writing the file in place means a Ctrl-C mid-write leaves truncated JSON
— and the user loses *all* history.

**Resulting `spikes.md`:**

> **Can a single JSON file stay fast at 100 habits × 5 years?**
> - **Why it mattered.** The data format is hard to change later; picking
>   wrong means a migration.
> - **What we tried.** A throwaway script: generate data, time load → modify →
>   save.
> - **Finding.** Yes — ~45 ms per cycle at 3.4 MB. Side finding: in-place
>   writes can corrupt the file if interrupted.
> - **What changes.** JSON is confirmed for the MVP. Saves must be atomic
>   (write to a temp file, then rename). Added to `mvp.md` risks.
> - **Code.** Deleted.

*Ten minutes of throwaway code settled a format debate and found a data-loss
risk before a single line of the real product existed.*

**Done when:**
- [x] Each spike answered its question.
- [x] Findings are in `spikes.md`, and `mvp.md` reflects them.
- [x] The spike code is deleted.

---

### Phase 5: Choose the tech stack

**Run:** `/pdev-stack solo developer, comfortable in Python, local only, zero
hosting budget, should install in one command`

**Key exchange:**

> **Agent:** Data store: a JSON file, as the spike confirmed, with a `version`
> field so the format can be migrated, and atomic writes. For verification
> I'd add `mypy --strict` alongside `ruff` and `pytest` — the streak logic is
> all date arithmetic, and strict types catch a class of bugs before the
> tests even run. CI on GitHub Actions running all three.
>
> **You:** Agreed on all of it.

**Resulting `tech-stack.md`:**

> **Constraints.** Solo developer, comfortable in Python · local-only · zero
> hosting budget · single-command install.
>
> | Layer | Choice | Why | Alternative considered |
> |---|---|---|---|
> | Language | Python 3.11+ | Primary language | — |
> | Framework | `argparse` (stdlib) | No framework needed for a CLI | `click` — nicer, but a dependency |
> | Data store | JSON file (`~/.habit-cli/`), versioned, atomic writes | Zero setup; spike showed it's fast enough | SQLite — more robust, no MVP benefit |
> | Distribution | `pipx` | Isolated install, one command | `pip` — pollutes global env |
> | Test runner | `pytest` | Standard, fast | — |
> | Lint / format / types | `ruff`, `mypy --strict` | Fast, strict feedback for the agent | — |
> | CI | GitHub Actions | Free, runs the same gates | — |
>
> **Hard-to-reverse.** On-disk data format — JSON with a `version` field.
>
> **Deliberately kept out.** No web framework · no database service · no async ·
> no ORM.

**`decisions.md` entry:**

> **2026-05-02 — JSON file as the data store, with atomic writes**
> - **Context.** MVP is single-user and local-only. Spike: ~45 ms at 100 habits
>   × 5 years; in-place writes can corrupt the file.
> - **Decision.** JSON file in `~/.habit-cli/` with a `version` field; every
>   save writes a temp file and renames it over the old one.
> - **Why.** Zero infra, fast enough. SQLite rejected — no MVP benefit.
> - **Consequences.** Trivial setup; a migration path will be needed if sync
>   or analytics are ever scoped in.

**Done when:**
- [x] Every layer of the stack has a chosen option and a one-line rationale.
- [x] Verification tooling (tests, types/lint, CI) is chosen.
- [x] Hard-to-reverse choices were identified and made deliberately.
- [x] You could explain the stack to someone else without the agent's help.

---

### Phase 6: Plan the build

**Run:** `/pdev-plan`

**Resulting `implementation-plan.md` (abbreviated):**

> **Phase A: Walking skeleton**
>
> **A.1 — CLI entry point**
> - Task. Package, entry point, and stub commands `add`, `done`, `list`.
> - Acceptance check: `test_cli.py::test_help_lists_commands` — `habit --help`
>   exits 0 and lists all three commands.
> - Depends on: none · Parallel group: — · Touches: `cli.py`, `pyproject.toml`
> - Review: auto
>
> **A.2 — JSON store load/save**
> - Task. `load_store()` / `save_store()`; atomic writes; `version: 1`.
> - Acceptance check: `test_store.py` — round-trip preserves data; the
>   directory is created on first run; the file contains `"version": 1`; an
>   interrupted save leaves the previous file intact.
> - Depends on: A.1 · Parallel group: — · Touches: `store.py`
> - Review: **human** — defines the on-disk format (hard to reverse).
>
> **Phase B: Core features**
>
> **B.1 — `add` persists a habit**
> - Acceptance check: `test_cli.py::test_add_then_list`.
> - Depends on: A.2 · Parallel group: **B1** · Touches: `cli.py`
> - Review: auto
>
> **B.2 — Streak calculation**
> - Task. Pure function `calculate_streak(dates, today) -> int`.
> - Acceptance check: `test_streak.py` — one test per success criterion: 0
>   with no logs, consecutive days, reset after a miss, same-day duplicates
>   count once, Apr 30 → May 1.
> - Depends on: none · Parallel group: **B1** · Touches: `streak.py`
> - Review: auto
>
> **B.3 — `done` marks today**
> - Acceptance check: `test_cli.py::test_done_is_idempotent`.
> - Depends on: B.1 · Parallel group: B2 · Touches: `cli.py`
> - Review: auto
>
> **B.4 — `list` shows streaks and today's status**
> - Acceptance check: `test_cli.py::test_list_shows_streak_and_status`.
> - Depends on: B.2, B.3 · Parallel group: — · Touches: `cli.py`
> - Review: auto
>
> **Phase C: Polish** — C.1 friendly errors for a corrupt store · C.2 help
> text and README *(same shape, omitted)*.

**Resulting `test-plan.md` (abbreviated):**

> **Gates.** `pytest` · `ruff check . && ruff format --check .` · `mypy --strict src`
>
> | Success criterion | Proven by | Automated? |
> |---|---|---|
> | Streak rules (4 criteria) | B.2 — `test_streak.py` | yes |
> | Data survives between runs | A.2 — `test_store_roundtrip` | yes |
> | Add + log in under 10 seconds | Phase 9 manual check | manual |
>
> **Critical flows (end-to-end).** add → done → list shows streak 1.
>
> **Deliberately not tested.** `argparse` internals · exact output formatting.

**Your review.** The agent flagged B.2 as the riskiest task and noted that B.1
and B.2 touch different files, so they can run in parallel. You read the whole
plan and changed one thing: A.2's check didn't originally include the
interrupted-save case from the spike. You added it.

**Done when:**
- [x] Every task has a runnable acceptance check.
- [x] Every MVP success criterion maps to a task's check or a manual check.
- [x] Something runs end-to-end early in the order.
- [x] Dependencies, parallel groups, and review levels are set on every task.
- [x] You've read the whole plan and approved it.

---

## Stage 2 — Build

### Phase 7: Set up the project

**Run:** `/pdev-setup`

**What the agent scaffolded:**

```
habit-cli/
  src/habit_cli/
    __init__.py
    cli.py          ← entry point; stub commands only
  tests/
    test_placeholder.py
  .github/workflows/ci.yml   ← runs pytest, ruff, mypy
  pyproject.toml    ← pipx-installable; ruff, mypy, pytest configured
  .gitignore
  AGENTS.md
  CLAUDE.md         ← "@AGENTS.md"
```

All three gates pass locally and in CI.

**Resulting `AGENTS.md` (abbreviated):**

> **Project overview.** A command-line habit tracker for developers: define
> habits, log them daily, see current streaks. Single-user, single-machine.
>
> **Run.** `pipx install -e .` · `habit --help`
>
> **Definition of done.**
> ```
> pytest
> ruff check . && ruff format --check .
> mypy --strict src
> ```
>
> **Conventions.** Type hints everywhere · no `print` outside `cli.py` · tests
> mirror `src/` · commit messages: imperative, ≤72 chars, with the task id.
>
> **Working autonomously.** Commits: wait for my review before committing.
>
> **Human-review triggers.** The on-disk data format · anything that deletes
> user data · `pyproject.toml` packaging and CI config.
>
> **Guardrails.** Never weaken a test to pass it · no new dependencies without
> asking · all file paths go through `store.py`.
>
> **Artifact map.** *(the default list, pointing at `docs/`)*

**Done when:**
- [x] The skeleton runs and every gate passes.
- [x] CI runs the same gates and is green.
- [x] `AGENTS.md` is filled in.
- [x] Everything is committed.

---

### Phase 8: Build — the loop

Three tasks are shown to illustrate the rhythm: a routine task, a `human` task,
and two tasks running in parallel.

---

**Task A.1 — CLI entry point** *(routine, `auto`)*

Run `/pdev-build A.1`. The agent wrote `test_help_lists_commands`, watched it
fail, created the stub commands, and reran the gates: all green. Its report:
three files changed, no deviations, nothing it was unsure about.

*Review:* read the report, skimmed the diff. Commit:
`add CLI entry point with stub commands (A.1)`.

---

**Task A.2 — JSON store** *(`human` — where your attention pays off)*

Run `/pdev-build A.2`. The agent wrote the four store tests, implemented the
store, and got every gate green. Its report pointed you at the serialization
function as the part needing line-by-line review.

*Review:* Reading it closely, you noticed dates were written with
`date.strftime("%x")` — locale-dependent. Every test passed, because tests run
under one locale. But a user who changes their system locale would find their
history unreadable. Exactly the kind of problem a hard-to-reverse format hides.

*Pushed back:*

```
Dates must be ISO 8601 (date.isoformat()) — the on-disk format can't depend on
the locale. Add a test that loads a store under a different locale.
```

The agent fixed it, added the test, reran the gates, and logged it:

> **2026-05-03 — Dates on disk are ISO 8601**
> - **Context.** Review of A.2: the first implementation used the
>   locale-dependent `%x` format.
> - **Decision.** Always `date.isoformat()`; a test pins it.
> - **Why.** The on-disk format must not change with the user's environment.
> - **Consequences.** None — caught before any data existed.

Commit: `add versioned JSON store with atomic writes (A.2)`.

---

**Tasks B.1 and B.2 — in parallel**

B.1 and B.2 share parallel group B1 and touch different files, so you started
two sessions, each in its own git worktree: `/pdev-build B.1` in one,
`/pdev-build B.2` in the other.

In B.2, the agent wrote `test_streak.py` from the acceptance check first — all
five cases failing. Its first implementation passed four of them; the
month-boundary test failed (an off-by-one computing the previous day across
months). The agent saw the failure, fixed the date arithmetic, and only
reported back once everything was green. The same-day duplicate case passed
first time, because it was written into the check back in Phase 6 — the rule
from Phase 2 never had a chance to get lost.

Both tasks came back green. Skimmed both diffs, merged both branches, one
commit each.

---

**Done when (all tasks complete):**
- [x] Every MVP task in the plan is checked off.
- [x] Every acceptance check exists as an automated test and passes.
- [x] Every `human` task was reviewed line by line.
- [x] The artifacts still match what was actually built.

---

## Stage 3 — Ship

### Phase 9: Verify & harden

**Run:** `/pdev-harden`

**Verify.** The end-to-end test for add → done → list existed from B.4 and
passed. The agent then used the CLI like a new user and timed it: adding and
logging a habit took about 6 seconds, including reading `--help` — the manual
criterion holds. You tried the same flow yourself.

It also found something no test covered: `habit done runing` (a typo) crashed
with a `KeyError` traceback.

**Harden — findings:**

> 1. **Should-fix.** Unknown habit names crash with a traceback instead of
>    "no habit named 'runing' — did you mean 'running'?"
> 2. **Should-fix.** The store file is created with the default umask — on a
>    shared machine others could read it. Set mode `0600`.
> 3. **Nice-to-have.** No `--version` flag.
> 4. **Nice-to-have.** Habit names are case-sensitive (`"Running"` ≠
>    `"running"`) — not documented anywhere.

**Triage:** fixed #1 and #2, each with a regression test. Logged #3 and #4 in
`decisions.md` as known, deferred items.

**Done when:**
- [x] Every critical flow passes end-to-end, and you've used the product yourself.
- [x] No known blockers remain, and each fix has a regression test.
- [x] Secrets and config are handled properly, not hard-coded.
- [x] A new person could clone, run, and understand the project from the README.

---

### Phase 10: Deploy

**Run:** `/pdev-deploy`

**Resulting `deployment.md`:**

> **Target environment.** Users' machines. Distributed via PyPI; installed with
> `pipx`.
>
> **Release process.** Automated: pushing a `v*` tag runs CI, builds with
> `python -m build`, and publishes to PyPI via trusted publishing (no stored
> token).
>
> **Environment variables & secrets.** None — PyPI trusted publishing needs no
> secret.
>
> **Health check.** `scripts/smoke.sh <version>` — installs that version with
> `pipx` in a clean temp environment and runs
> `habit add test && habit done test && habit list`; exits non-zero unless the
> streak is 1.
>
> **Rollback.** Yank the bad release on PyPI; the previous version remains
> installable. Re-run the smoke test against it.

The agent prepared everything; you pushed the `v0.1.0` tag yourself. The smoke
test passed against the published package.

**Done when:**
- [x] The product is reachable by its intended users.
- [x] Deploying again is a repeatable, automated process.
- [x] Rollback is written down, and the health checks run as a command.

---

### Phase 11: Iterate

**Run:** `/pdev-iterate "I want to remove habits I gave up on" / "I missed
logging yesterday — can I back-fill?" / "habit list is wrong right after
midnight"`

**Triage:**

> - *"Remove habits"* — improvement, already on the deferred list. Small
>   effort, high value. Recommended for the next iteration.
> - *"Back-fill a missed day"* — new feature, explicitly deferred. Needs
>   scoping first: just yesterday, or any date? Don't build until answered.
> - *"Wrong right after midnight"* — **bug**. Reproduced: `list` computes
>   "today" once at import time, so a long-running shell session goes stale.
>   Added task D.1, whose acceptance check is a test that reproduces it.

**Outcome:** `/pdev-build D.1` fixed the bug. `project-scope.md` updated —
remove habits moved into the features list; back-fill moved into open
questions. The loop returns to Stage 1 for the next iteration.

**Done when:**
- [x] Feedback is triaged, not sitting in a pile.
- [x] Every bug to fix has a task that starts with a reproducing test.
- [x] The next iteration's focus is decided and scoped.
- [x] `project-scope.md` and the deferred list reflect current reality.

---

## The `decisions.md` at the end

A decision log accumulates across every phase. Here is what it looked like at
the end of the first iteration:

> **2026-05-06 — Case-sensitivity in habit names is known but deferred**
> - **Context.** Phase 9 review flagged that `"Running"` and `"running"` are
>   different habits.
> - **Decision.** Leave it for now; document it in the README.
> - **Why.** Fixing it requires a data migration. Low impact for an MVP.
> - **Consequences.** Could cause confusing duplicates.
>
> **2026-05-05 — Store file is private to the user (mode 0600)**
> - **Context.** Phase 9 review: the file was created with the default umask.
> - **Decision.** Create it with mode `0600`.
> - **Why.** Habit data is personal; shared machines exist.
> - **Consequences.** None for single-user use.
>
> **2026-05-03 — Dates on disk are ISO 8601**
> - **Context.** Phase 8, human review of A.2: the first implementation used a
>   locale-dependent format that every test passed.
> - **Decision.** Always `date.isoformat()`; a test pins it.
> - **Why.** The on-disk format must not depend on the user's environment.
> - **Consequences.** None — caught before any data existed.
>
> **2026-05-02 — JSON file as the data store, with atomic writes**
> - **Context.** Phase 5, informed by the Phase 4 spike.
> - **Decision.** Versioned JSON in `~/.habit-cli/`; temp file + rename on save.
> - **Why.** Zero infra, fast enough; atomic writes prevent losing all history
>   to an interrupted save.
> - **Consequences.** Migration path needed if sync is ever scoped in.

---

The point: each problem was caught by the mechanism built to catch it. The
"what is a day" ambiguity and the duplicate-logging rule were caught by
clarification, then locked into acceptance checks before any code existed. The
data-loss risk was caught by a ten-minute spike. The month-boundary bug was
caught by the agent itself, because the check existed before the code. And the
locale bug — which passed every test — was caught by a human, because the plan
said that task deserved one. The prompts aren't magic; the artifacts and the
checks are. That's the whole framework in one paragraph.
