# Worked Example

A complete, end-to-end walkthrough of the framework applied to a small project:
**a command-line habit tracker**. Every phase is shown — prompts, agent
exchanges, filled-in artifacts, and completion checks. The artifacts are
abbreviated (real ones have more detail) but the shape and content are faithful.

This is markdown only on purpose. The framework doesn't ship sample code; the
agent generates that.

---

## Stage 1 — Plan

### Phase 1: Define the scope

**What you do.** Open `project-scope.md` and fill in what's in your head. Be
rough. No agent yet — this phase is just you.

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

**Prompt:**

```
Read project-scope.md. Review it critically and ask me clarifying questions.
Find gaps, ambiguities, and things I haven't thought through — especially
around users, edge cases, and what's explicitly out of scope. Don't suggest
solutions yet. Ask one focused batch of questions at a time.
```

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

**Prompt:**

```
Update project-scope.md to reflect everything we just discussed. Keep it
concise. Add an "Out of scope" and an "Open questions" section if we have
material for them.
```

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
> **Features.** Add a habit · mark a habit done for today · view current
> streaks · remove a habit.
>
> **Out of scope.** Reminders/notifications · multi-device sync · any GUI ·
> sub-daily or non-daily habits · back-filling missed days · multi-user support.
>
> **Open questions.** What happens to logged data when a habit is removed?
> → parked; deferred with the remove feature itself.

*The two rounds of questions surfaced the "what is a day" ambiguity, the
idempotent-logging rule, and pushed back-filling out of scope — all decisions
that would have caused churn if left until the build phase.*

**Done when:**
- [x] The agent has no more first-order clarifying questions.
- [x] "Out of scope" is written down, not just implied.
- [x] Open questions are either resolved or explicitly parked.

---

### Phase 3: Define the MVP

**Prompt:**

```
Based on project-scope.md, help me define the MVP — the smallest version that
still solves the core problem and is worth shipping. For each feature, argue
whether it's truly MVP or can wait. Challenge me when I'm gold-plating. Then
draft mvp.md with the MVP scope, what's deferred, and the success criteria that
tell us the MVP worked.
```

**Key exchange:**

> **Agent:** "Remove habits" — I'd defer this. The core problem is *losing
> track of streaks and logging habits*. A user can simply ignore a habit they've
> given up on; the product still solves the problem. Including delete also means
> deciding what happens to history, which is a scope risk for an MVP.
>
> **You:** Fair. Defer it.
>
> **Agent:** "View streaks" must be in the MVP — it's the feedback loop that
> makes logging worth doing. Agreed?
>
> **You:** Agreed.

**Resulting `mvp.md`:**

> **Core problem the MVP must solve.** Log a habit and see whether the streak
> is alive — without friction.
>
> **In the MVP.** Add a habit · mark done for today · view streaks.
> *(Remove was deferred — you can ignore a habit; the product still solves the
> core problem without delete.)*
>
> **Deferred.** Remove habits · back-fill missed days · stats or history beyond
> the current streak.
>
> **Success criteria.** A new user can add a habit and log it in under 10
> seconds · streak count is correct across day boundaries · data survives
> between runs.
>
> **Assumptions & risks.** Users are willing to adopt a CLI tool · a local JSON
> file won't be too slow even for 50+ habits.

**Done when:**
- [x] The MVP feature list is shorter than your instinct wanted it to be.
- [x] You've written down what success looks like for the MVP.
- [x] Deferred features are recorded so they aren't lost.

---

### Phase 4: Choose the tech stack

**Prompt:**

```
Based on project-scope.md and mvp.md, propose a tech stack. My constraints are:
solo developer, comfortable in Python, runs locally only, zero hosting budget,
should install in one command. For each layer give one primary recommendation
and one alternative, with the trade-offs. Flag anything that's hard to change
later. Don't pad the stack — fewer moving parts is better for an MVP.
```

**Key exchange:**

> **Agent:** For the data store I'm recommending a JSON file over SQLite.
> Reasons: single-user, no concurrent writes, human-readable for debugging.
> SQLite is more robust but adds no MVP benefit for a local tool. The main
> trade-off: JSON is harder to query if you add analytics later. Worth it?
>
> **You:** Yes. Add a `version` field so we can migrate the format if needed.
>
> **Agent:** Good call. I'll flag the on-disk format as a hard-to-reverse
> decision and record it in `decisions.md`.

**Resulting `tech-stack.md`:**

> **Constraints.** Solo developer, comfortable in Python · local-only · zero
> hosting budget · single-command install.
>
> | Layer | Choice | Why | Alternative considered |
> |---|---|---|---|
> | Language | Python 3.11+ | Primary language | — |
> | Framework | `argparse` (stdlib) | No framework needed for a CLI | `click` — more ergonomic but a dependency |
> | Data store | JSON file (`~/.habit-cli/`) | Zero setup, human-readable | SQLite — more robust, no MVP benefit |
> | Distribution | `pipx` | Isolated install, one command | `pip` — simpler but pollutes global env |
> | Tooling | `ruff` + `pytest` | Fast lint and test | — |
>
> **Hard-to-reverse.** On-disk data format. Chose JSON with a `version` field
> so the format can be migrated later.
>
> **Deliberately kept out.** No web framework · no database service · no async ·
> no ORM.

**`decisions.md` entry (first):**

> **2026-05-02 — JSON file as the data store**
> - **Context.** MVP is single-user and local-only; no concurrent writers.
> - **Decision.** JSON file in `~/.habit-cli/`, with a `version` field.
> - **Why.** Zero infra, zero ops. SQLite considered and rejected — adds no MVP
>   benefit. The `version` field keeps migration possible.
> - **Consequences.** Trivial setup; will need a migration path if multi-user
>   sync or analytics ever gets scoped in.

**Done when:**
- [x] Every layer of the stack has a chosen option and a one-line rationale.
- [x] Hard-to-reverse choices were identified and made deliberately.
- [x] You could explain the stack to someone else without the agent's help.

---

### Phase 5: Create the implementation plan

**Prompt:**

```
Create an implementation plan in implementation-plan.md. Break the MVP into
small tasks — each one reviewable in a single sitting — and group them into
phases. Order them so we have something running end-to-end as early as
possible, and so every task builds on already-working code. Mark dependencies
between tasks. Each task should have a clear "done when" check.
```

**Resulting `implementation-plan.md`:**

> **Phase A: Walking skeleton**
>
> **A.1 — CLI entry point**
> - Task. Create the package, entry point, and stub commands (`add`, `done`,
>   `list`) that parse arguments and print "not implemented."
> - Depends on: none
> - Done when: `habit --help` and `habit add foo` both run without errors.
>
> **A.2 — JSON store load/save**
> - Task. Implement `load_store()` and `save_store()` — create the file on
>   first run, read it on subsequent runs.
> - Depends on: A.1
> - Done when: `habit add foo` creates `~/.habit-cli/data.json`; re-running
>   reads the same file.
>
> **Phase B: Core features**
>
> **B.1 — `add` persists a habit**
> - Task. Wire `add <name>` to store the habit in the JSON file.
> - Depends on: A.2
> - Done when: `habit add foo` followed by `habit list` shows "foo."
>
> **B.2 — `done` marks today**
> - Task. Wire `done <name>` to record today's date for that habit.
> - Depends on: B.1
> - Done when: `habit done foo` records today's date; running it again is
>   idempotent.
>
> **B.3 — Streak calculation**
> - Task. Compute the current streak from the log of dates.
> - Depends on: B.2
> - Done when: streak is 1 after the first log, 2 after a second consecutive
>   day; resets to 0 after a missed day.
>
> **B.4 — `list` shows streaks and today's status**
> - Task. Print each habit with its streak count and whether it's been done
>   today.
> - Depends on: B.3
> - Done when: `habit list` shows name, streak count, and "✓ done" or
>   "○ pending" for today.
>
> **Phase C: Polish**
>
> **C.1 — Friendly errors**
> - Task. Catch a missing or corrupt store file; print a human-readable error
>   instead of a raw traceback.
> - Depends on: A.2
> - Done when: deleting the store file and running `habit list` gives a helpful
>   message, not a crash.
>
> **C.2 — Help text and README**
> - Task. Fill in `--help` text for each command; write a README covering
>   install and basic usage.
> - Depends on: B.4
> - Done when: `habit --help` and `habit add --help` are clear to a new user.

**Done when:**
- [x] No task is so big you can't picture its diff.
- [x] The ordering produces a runnable thing early, not only at the end.
- [x] Each task has a verifiable completion check.

---

## Stage 2 — Build

### Phase 6: Set up the project

**Prompt:**

```
Scaffold the project per tech-stack.md: directory structure, dependency
manifest, linter/formatter, test runner, a minimal runnable entry point, and a
.gitignore. Keep it minimal — no features yet. Then create AGENTS.md at the repo
root: a short project overview, how to run and test the project, the coding
conventions we'll follow, guardrails (what you should never do without asking),
and a map of where each planning artifact lives.
```

**What the agent scaffolded:**

```
habit-cli/
  src/habit_cli/
    __init__.py
    cli.py          ← entry point; stub commands only
    store.py        ← empty placeholder
  tests/
    __init__.py
  pyproject.toml    ← pipx-installable; ruff + pytest configured
  .gitignore
  AGENTS.md
```

`habit --help` runs. `pytest` passes with zero tests. First commit made.

**Resulting `AGENTS.md`:**

> **Project overview.** A command-line habit tracker for developers. Users
> define habits, log them daily, and see current streaks. Single-user,
> single-machine. See `docs/project-scope.md` for full context.
>
> **Run & test.**
> ```
> pipx install -e .       # install (dev mode)
> habit --help            # run
> pytest                  # test
> ruff check src tests    # lint
> ruff format src tests   # format
> ```
>
> **Conventions.** Python 3.11+ with type hints everywhere · `ruff` for lint
> and format · commit messages: imperative mood, ≤72 chars · no `print` in
> library code (only in `cli.py`) · test files mirror `src/` structure.
>
> **Guardrails.** Do not add dependencies without asking · do not change the
> on-disk data format without a migration plan · do not hard-code file paths —
> route everything through the store module · do not commit without a passing
> test run.
>
> **Artifact map.**
> - Scope & requirements — `docs/project-scope.md`
> - MVP definition — `docs/mvp.md`
> - Tech stack — `docs/tech-stack.md`
> - Implementation plan — `docs/implementation-plan.md`
> - Test plan — `docs/test-plan.md`
> - Deployment — `docs/deployment.md`
> - Decision log — `docs/decisions.md`

**Done when:**
- [x] The skeleton runs and the test command passes (even with zero real tests).
- [x] `AGENTS.md` exists and points to every planning artifact.
- [x] It's all committed.

---

### Phase 7: The build loop

Each task follows the same six-step loop: **frame → build → review → verify →
record → commit.** Two tasks are shown in full to illustrate the rhythm.

---

**Task A.1 — CLI entry point** *(a clean, simple pass)*

*Frame (prompt to agent):*

```
Read AGENTS.md and implementation-plan.md. Implement task A.1: CLI entry point.
Use only the context in our artifacts — if something is unspecified, ask before
assuming. Keep the change scoped to this task. When you're done, tell me how to
verify it and what to review.
```

*Build:* Agent created `cli.py` with three stub commands and wired the entry
point in `pyproject.toml`.

*Review:* Diff was clean and scoped. Nothing unexpected.

*Verify:* `habit --help` ✓ · `habit add foo` prints "not implemented" ✓

*Record:* No deviations. Task checked off in `implementation-plan.md`.

*Commit:* `add CLI entry point with stub commands (A.1)`

---

**Task B.3 — Streak calculation** *(the illustrative task — a bug caught in review)*

*Frame (prompt to agent):*

```
Read AGENTS.md and implementation-plan.md. Implement task B.3: streak
calculation. The rule: consecutive calendar days up to and including today
counts as the streak; a missed day resets it to 0. A habit logged more than
once on the same day is idempotent — not a break. Use only the context in our
artifacts. Tell me how to verify it and what to review.
```

*Build:* Agent implemented `calculate_streak(dates: list[date]) -> int`.

*Review:* The logic looked right on a quick read. But tracing through the
date arithmetic carefully — when the same date appeared twice in the list, the
function counted it as two consecutive days, breaking the streak. A bug that
Phase 2 clarification had already ruled out.

*Pushed back:*

```
The logic here counts a duplicate date as two separate days — project-scope.md
says same-day logging is idempotent. Fix it.
```

*Agent fixed it* by deduplicating dates before computing the streak.

*Verify:* Manually called the function with test inputs including duplicate
dates. Correct.

*Record:* Logged in `decisions.md`:

> **2026-05-03 — Logging a habit twice in one day is idempotent**
> - **Context.** During review of B.3, the first implementation broke streaks
>   when `done` was run twice on the same day.
> - **Decision.** Deduplicate dates before streak calculation; `done` is always
>   safe to run multiple times.
> - **Why.** Consistent with the Phase 2 clarification. A streak-breaking
>   duplicate would be a silent surprise to the user.
> - **Consequences.** No "already logged" error needed; running `done` twice is
>   harmless.

Also updated `project-scope.md` to make the idempotent-logging rule explicit
rather than buried in the clarification history.

*Commit:* `implement streak calculation with idempotent logging (B.3)`

---

**Done when (all tasks complete):**
- [x] Every MVP task in the plan is checked off.
- [x] Every task was reviewed and committed individually.
- [x] The artifacts still match what was actually built.

---

### Phase 8: Test & verify

**Prompt:**

```
Based on mvp.md and the code we've built, draft test-plan.md: what we test, at
what level, and which user flows are critical. Then write tests for the MVP
success criteria and the riskiest areas first. Tell me what you chose not to
test and why.
```

**Resulting `test-plan.md`:**

> **Strategy.** Unit-test the streak logic hard — it's the riskiest part.
> One end-to-end test per CLI command. Skip testing `argparse` itself.
>
> **Critical user flows.** Add a habit and log it · view streaks after multiple
> days · verify streak resets after a missed day.
>
> **Coverage by level.**
>
> | Level | What it covers here | Priority |
> |---|---|---|
> | Unit | `calculate_streak` — all edge cases | High |
> | Integration | Store load/save roundtrip | High |
> | End-to-end | One test per CLI command | Medium |
>
> **MVP success criteria → tests.**
>
> | Criterion (from mvp.md) | Covered by |
> |---|---|
> | Streak correct across day boundaries | `test_streak_across_midnight` |
> | Data survives between runs | `test_store_roundtrip` |
> | Add + log in under 10 seconds | manual timing only — not automated |
>
> **Deliberately not tested.** `argparse` wiring (framework-level, not our
> logic) · exact terminal output formatting (brittle, low value for an MVP).

**What the tests caught:** `test_streak_across_midnight` failed — an off-by-one
in the date arithmetic when a month rolls over (e.g., April 30 → May 1). Fixed.
Suite green.

**Done when:**
- [x] Every MVP success criterion from `mvp.md` has a test or a deliberate,
      documented reason it doesn't.
- [x] The critical user flows are covered end-to-end.
- [x] The full suite passes.

---

## Stage 3 — Ship

### Phase 9: Review & harden

**Prompt:**

```
Do a pre-launch review of the codebase against mvp.md. Go angle by angle:
security, edge cases, error handling, and documentation. For each finding, rate
it blocker / should-fix / nice-to-have, and explain the risk. Don't fix
anything yet — give me the list first so I can triage.
```

**Findings:**

> 1. **Blocker.** `~/.habit-cli/` isn't created on first run — `open()` will
>    crash with `FileNotFoundError`. Fix: `mkdir -p` before the first write.
> 2. **Should-fix.** A corrupt JSON file crashes with a raw traceback. (Already
>    handled — C.1 is implemented. Confirmed on recheck.)
> 3. **Nice-to-have.** No `--version` flag.
> 4. **Nice-to-have.** Habit names are case-sensitive (`"Running"` ≠
>    `"running"`) — not documented anywhere.

**Triage:** Fixed #1 (the blocker). Confirmed #2 was already in place. Logged
#3 and #4 in `decisions.md` as known, deferred items.

**Done when:**
- [x] No known blocker-level issues remain.
- [x] Secrets and config are handled properly, not hard-coded.
- [x] A new person could clone, run, and understand the project from the README.

---

### Phase 10: Deploy

**Prompt:**

```
Based on tech-stack.md, draft deployment.md: target environment, step-by-step
build and release process, required environment variables and how secrets are
managed, the rollback procedure, and the health checks that confirm a good
deploy. Then help me automate the release path so future deploys are repeatable.
```

**Resulting `deployment.md`:**

> **Target environment.** Local machine. Distributed via PyPI; installed by
> the user with `pipx`.
>
> **Release process.**
> 1. Bump version in `pyproject.toml`.
> 2. Commit and tag: `git tag v0.1.0`.
> 3. Build: `python -m build`.
> 4. Publish: `twine upload dist/*`.
> 5. Verify in a clean environment: `pipx install habit-cli && habit --help`.
>
> **Environment variables & secrets.** None — local-only tool, no secrets.
>
> **Health check.** `pipx install habit-cli` succeeds in a clean env;
> `habit --help` prints usage; `habit add test && habit done test && habit list`
> shows a streak of 1.
>
> **Rollback.** Yank the bad release from PyPI
> (`twine yank habit-cli 0.1.0`). The previous version remains installable.

**Done when:**
- [x] The product is reachable by its intended users.
- [x] Deploying again is a repeatable process, not improvisation.
- [x] You know how to roll back and how to tell if it's healthy.

---

### Phase 11: Iterate

**Prompt:**

```
Here is the feedback from the first users: "I want to remove habits I gave up
on" and "I missed logging yesterday — can I back-fill?" Help me triage it into
bugs, improvements, and new features. Note the user impact and rough effort.
Then recommend what the next iteration should focus on, and which artifacts
need updating to reflect it.
```

**Triage:**

> - *"Remove habits"* — improvement, was already on the deferred list. Small
>   effort, high value (reduces clutter). Recommended for the next iteration.
> - *"Back-fill a missed day"* — new feature, was explicitly deferred. Moderate
>   effort. Needs scoping first: how far back can you fill? Just yesterday, or
>   any date? Don't commit to building it until that question is answered.

**Outcome:** `project-scope.md` updated — remove habits moved into the features
list; back-fill moved into open questions. Loop returns to Stage 1 for the next
iteration.

**Done when:**
- [x] Feedback is triaged, not sitting in a pile.
- [x] The next iteration's focus is decided and scoped.
- [x] `project-scope.md` and the deferred list reflect current reality.

---

## The `decisions.md` at the end

A decision log accumulates across every phase. Here is what it looked like at
the end of the first iteration:

> **2026-05-05 — Case-sensitivity in habit names is known but deferred**
> - **Context.** Phase 9 review flagged that `"Running"` and `"running"` are
>   treated as different habits.
> - **Decision.** Leave it for now; document it in the README.
> - **Why.** Fixing it requires a migration for existing data. Low user impact
>   for an MVP with one user.
> - **Consequences.** Could cause confusing duplicates if users aren't careful.
>
> **2026-05-04 — Store directory must be created on first run**
> - **Context.** Phase 9 review found a blocker: `~/.habit-cli/` wasn't
>   created automatically.
> - **Decision.** `mkdir -p` in `save_store()` before every write.
> - **Why.** Crash on first run is unacceptable. One line of code.
> - **Consequences.** None — `mkdir -p` is idempotent.
>
> **2026-05-03 — Logging a habit twice in one day is idempotent**
> - **Context.** Phase 7, review of B.3. First implementation broke streaks
>   on duplicate same-day logs.
> - **Decision.** Deduplicate dates before streak calculation.
> - **Why.** Consistent with Phase 2 clarification. Surprise streak-break would
>   feel like data corruption to the user.
> - **Consequences.** `done` is always safe to run multiple times.
>
> **2026-05-02 — JSON file as the data store**
> - **Context.** Phase 4 stack decision. MVP is single-user, local-only.
> - **Decision.** JSON file in `~/.habit-cli/` with a `version` field.
> - **Why.** Zero infra, zero ops. SQLite adds no MVP benefit. `version` field
>   keeps migration possible.
> - **Consequences.** Trivial setup; migration path needed if multi-user sync
>   ever gets scoped in.

---

The point: every decision that could have caused churn — the "what is a day"
ambiguity, the idempotent-logging bug, the missing store directory, the month
rollover off-by-one — was caught *because* the artifacts existed and the agent
had context to reason against them. The prompts aren't magic; the artifacts are.
That's the whole framework in one sentence.
