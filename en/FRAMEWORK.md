# The Framework

This document is the methodology. It walks through eleven phases, grouped into
three stages — **Plan**, **Build**, **Ship** — that take a product from a rough
idea to a deployed release, with an AI coding agent as your collaborator
throughout.

Work through the phases in order the first time. After that, the process loops:
phase 11 feeds back into phase 1 for the next iteration.

## What this framework assumes about agents

Coding agents no longer write one small snippet at a time while you watch. They
work for long stretches on their own, run the tests, read the failures, fix
their own mistakes, and can work on several tasks in parallel. That changes
where your attention is worth the most:

- **The plan is the highest-leverage thing you review.** A wrong plan executed
  autonomously produces a lot of wrong code, fast.
- **Executable checks are the spec.** An agent that can run a check will keep
  working until it passes. An agent with only prose to go on will stop when it
  _thinks_ it's done. So the checks are written before the code.
- **Review depth follows risk, not volume.** Automated gates catch the routine
  problems on every change. Your careful, line-by-line attention goes to the
  changes that are expensive to get wrong.
- **Code is cheap — including throwaway code.** A one-hour prototype can answer
  a question that a week of discussion can't.

What hasn't changed: the agent is only as good as the context it's given, and
the decisions are yours.

## How to read this document

Each phase below follows the same shape:

- **Goal** — what the phase produces and why it matters.
- **Inputs** — what you need before starting.
- **Work** — what you and the agent actually do.
- **Run** — the skill that drives the phase (see below).
- **Output** — the artifact created or updated. Templates live in [`templates/`](templates/).
- **Done when** — the checklist that tells you it's safe to move on.

## Skills: the prompts, packaged

Every phase that involves the agent has a matching **skill** in
[`skills/`](skills/) — a `SKILL.md` file holding the phase's prompt, the
artifacts it reads and writes, and its completion checklist. The installer
copies them into your project's `.claude/skills/`, so in Claude Code you run a
phase by typing its name: `/pdev-clarify`, `/pdev-plan`, `/pdev-build A.2`.

`/pdev` is the guide: it reads your artifacts, works out which phase you're in,
and tells you what to do next. Use it whenever you've lost your place.

Skills are plain markdown. With an agent that doesn't load `SKILL.md` files,
paste the body of the skill as your prompt — it works the same way.

## A note on artifacts

The artifacts are **living documents**, not paperwork. Keep them in your
project's version control. The agent reads them at the start of every task to
recover context, and updates them whenever reality drifts from the plan. An
artifact that's out of date is worse than no artifact — it lies to the agent.

Don't rely on discipline alone to keep them current. Every build task ends with
the agent updating the plan and the decision log, and the installer adds an
optional Claude Code hook that reminds the agent when code changed but no
artifact did.

---

# Stage 1 — Plan

The goal of this stage is to make the important decisions while they're still
cheap to change — and to test the risky ones for real before committing to
them.

## Phase 1: Define the scope

**Goal.** Capture what you're building and why, in your own words, before
involving the agent. This is the seed everything else grows from.

**Inputs.** An idea. That's it.

**Work.** Open [`templates/project-scope.md`](templates/project-scope.md) and
fill in the Problem, Solution, and Features sections with your initial thinking.
Be rough. Don't polish. The point is to externalize what's in your head so it
can be examined — and to make sure the starting point is _yours_, not the
agent's.

**Run.** _(nothing — this phase is just you)_

**Output.** `project-scope.md`, first draft.

**Done when.**

- [ ] You can state the problem in one or two sentences.
- [ ] You've listed the features you imagine, even half-formed ones.

## Phase 2: Clarify the requirements

**Goal.** Turn your rough scope into something precise enough to build from.
Surface the gaps, contradictions, and unspoken assumptions now.

**Inputs.** `project-scope.md` first draft.

**Work.** Hand the scope to the agent and let it interrogate you. Its job here
is _not_ to agree with you — it's to find what you haven't thought through.
Answer its questions in rounds. When the questions run dry, the agent rewrites
`project-scope.md` to reflect what you concluded together.

**Run.** `/pdev-clarify` — [skill](skills/pdev-clarify/SKILL.md)

**Output.** `project-scope.md`, refined.

**Done when.**

- [ ] The agent has no more first-order clarifying questions.
- [ ] "Out of scope" is written down, not just implied.
- [ ] Open questions are either resolved or explicitly parked.

## Phase 3: Define the MVP

**Goal.** Find the smallest version that still solves the core problem — and is
worth shipping. Everything else becomes "later."

**Inputs.** Refined `project-scope.md`.

**Work.** With the agent, sort the features into "MVP" and "later." Pressure-test
the MVP line: for each feature you want to include, ask whether the product
still solves the core problem without it. If yes, it's not MVP. Write success
criteria that are **concrete enough to become automated tests** — they will, in
phase 6. Name the assumptions the MVP is betting on, and mark the ones that are
both risky and testable.

**Run.** `/pdev-mvp` — [skill](skills/pdev-mvp/SKILL.md)

**Output.** [`mvp.md`](templates/mvp.md).

**Done when.**

- [ ] The MVP feature list is shorter than your instinct wanted it to be.
- [ ] Every success criterion is concrete enough to check automatically, or is
      explicitly marked as a manual check.
- [ ] Deferred features are recorded so they aren't lost.
- [ ] Risky assumptions are listed, and the ones worth a spike are marked.

## Phase 4: Spike the unknowns _(skip if there are none)_

**Goal.** Answer the riskiest open questions with throwaway code instead of
debate — before they shape the stack and the plan.

**Inputs.** `mvp.md` (the assumptions marked for a spike).

**Work.** Pick the one to three questions where being wrong would hurt most:
_Does the core interaction actually feel right? Can this API do what we need?
Is this fast enough? Will the model handle this input?_ For each, have the
agent build the smallest possible prototype that answers it — in a scratch
branch or directory, ignoring quality entirely. Look at the result yourself.
Record the question, what you tried, and what you learned in
[`templates/spikes.md`](templates/spikes.md). **Then delete the code.** Keep the
conclusions, not the prototype — prototype code that sneaks into the real
codebase carries every shortcut you took to write it fast.

Skip this phase if nothing in the MVP is genuinely uncertain. A familiar CRUD
app on a familiar stack doesn't need a spike.

**Run.** `/pdev-spike` — [skill](skills/pdev-spike/SKILL.md)

**Output.** `spikes.md`; updated `mvp.md` assumptions; entries in
`decisions.md` for anything a spike settled.

**Done when.**

- [ ] Each spike answered its question (yes, no, or "not like that").
- [ ] Findings are recorded in `spikes.md`, and `mvp.md` reflects them.
- [ ] The spike code is deleted or clearly fenced off from the real project.

## Phase 5: Choose the tech stack

**Goal.** Decide what you're building it with — and why — before any setup.

**Inputs.** `project-scope.md`, `mvp.md`, `spikes.md` if you ran any.

**Work.** Ask the agent to propose a stack that fits the MVP, your constraints
(skills, hosting, budget, timeline), the non-functional needs (scale, latency,
offline, etc.), and what the spikes taught you. Make it justify each choice and
name the trade-offs. Include **verification tooling** — test runner, type
checker, linter, CI — as first-class layers: the agent leans on them
constantly, and a stack with fast, strict feedback makes it far more reliable.
You pick. Record the decision in
[`templates/tech-stack.md`](templates/tech-stack.md) and log the significant
calls in [`templates/decisions.md`](templates/decisions.md).

**Run.** `/pdev-stack` — [skill](skills/pdev-stack/SKILL.md)

**Output.** `tech-stack.md`; entries in `decisions.md`.

**Done when.**

- [ ] Every layer of the stack has a chosen option and a one-line rationale.
- [ ] Verification tooling (tests, types/lint, CI) is chosen, not left for later.
- [ ] Hard-to-reverse choices were identified and made deliberately.
- [ ] You could explain the stack to someone else without the agent's help.

## Phase 6: Plan the build

**Goal.** Break the MVP into tasks an agent can complete and _prove_ complete
on its own — and decide up front how each one gets verified and reviewed. This
plan is the spine of the build stage, and the most important thing you review
in the whole framework.

**Inputs.** `project-scope.md`, `mvp.md`, `tech-stack.md`.

**Work.** The agent drafts two artifacts together:

- [`implementation-plan.md`](templates/implementation-plan.md) — tasks grouped
  into phases, ordered so something runs end-to-end early. Every task gets:
  - an **acceptance check** — a test or command that passes when the task is
    done. Not "works correctly"; something runnable.
  - its **dependencies** and a **parallel group**, so tasks that don't depend
    on each other — and don't touch the same files — can run at the same time.
  - a **review level**: `auto` (gates plus a quick skim are enough) or `human`
    (you read the diff carefully), with the reason.
- [`test-plan.md`](templates/test-plan.md) — the verification strategy: the
  gates every change must pass, how each MVP success criterion maps to a test,
  which user flows get end-to-end coverage, and what's deliberately not tested.

Then review the plan hard. Size tasks by **verifiability**, not by how much
code you can read in one sitting: a task is the right size when it has one
clear acceptance check and the agent can finish it without coming back to ask.
Anything that touches data formats, auth, money, public interfaces, or
deployment should be marked `human`.

**Run.** `/pdev-plan` — [skill](skills/pdev-plan/SKILL.md)

**Output.** `implementation-plan.md`; `test-plan.md`.

**Done when.**

- [ ] Every task has an acceptance check that can be run, not just read.
- [ ] Every MVP success criterion maps to at least one task's acceptance check
      (or a documented manual check).
- [ ] The ordering produces a runnable thing early, not only at the end.
- [ ] Dependencies, parallel groups, and review levels are set on every task.
- [ ] You've read the whole plan yourself and would be comfortable with an
      agent executing it.

---

# Stage 2 — Build

Now code exists. The discipline here is to let the agent work autonomously
_inside_ guardrails you set up deliberately — and to keep the artifacts in sync.

## Phase 7: Set up the project

**Goal.** Create the project's skeleton, the automated gates, and the agent's
working context, so every later task starts from solid ground.

**Inputs.** `tech-stack.md`, `implementation-plan.md`, `test-plan.md`.

**Work.** Have the agent scaffold the repo per the tech stack: directory
structure, dependency manifest, formatter/linter, type checker, test runner, a
minimal entry point that actually runs, `.gitignore`, and **CI that runs every
gate from `test-plan.md` on each push**. Then fill in
[`AGENTS.md`](templates/AGENTS.md) at the repo root — the file every agent
reads first. It records how to run and check the project, the conventions, what
the agent may do on its own, what needs a human, and where the artifacts live.
`CLAUDE.md` simply imports it (`@AGENTS.md`), so there's one source of project
context for every agent.

**Run.** `/pdev-setup` — [skill](skills/pdev-setup/SKILL.md)

**Output.** A runnable, committed skeleton; CI; a filled-in `AGENTS.md`.

**Done when.**

- [ ] The skeleton runs, and every gate command passes (even with zero real tests).
- [ ] CI runs the same gates and is green.
- [ ] `AGENTS.md` lists the gate commands, the autonomy rules, the human-review
      triggers, and every artifact's location.
- [ ] It's all committed.

## Phase 8: Build — the loop

**Goal.** Turn the plan into working software, task by task, with the agent
working autonomously and you spending attention where risk is.

**Inputs.** `implementation-plan.md`, `test-plan.md`, `AGENTS.md`, and the rest
of the artifacts.

**Work.** For each task (or each parallel group of tasks):

1. **Start.** Run `/pdev-build <task-id>`. Independent tasks in the same
   parallel group can run at the same time in separate agent sessions, each on
   its own branch or worktree.
2. **Check first.** The agent writes the task's acceptance check as a test and
   confirms it fails — proving the check actually tests something.
3. **Build until green.** The agent implements and iterates until the
   acceptance check, the full suite, and every other gate pass. It may not
   weaken, skip, or delete a check to get there.
4. **Self-review.** The agent reviews its own diff with fresh eyes — ideally a
   separate review pass or reviewer agent, not the same context that wrote the
   code — and fixes what it finds.
5. **Record.** The agent checks the task off in `implementation-plan.md`, logs
   any decision or deviation in `decisions.md`, and reports back: what changed,
   anything it was unsure of, and anything that deviated from the plan.
6. **Review — in proportion to risk.** For `auto` tasks, read the report and
   skim the diff. For `human` tasks, read the diff line by line and push back
   on anything you wouldn't have written.
7. **Commit.** One task, one focused commit.

The agent stops and asks instead of pushing on when: the spec is ambiguous, the
task is turning out bigger than planned, it hits a human-review trigger the
plan didn't anticipate, or the only way to pass a check is to change the check.
When a task is bigger than expected, split it in the plan rather than letting
one change balloon.

**Run.** `/pdev-build <task-id>` — [skill](skills/pdev-build/SKILL.md)

**Output.** Working, committed code, task by task; `implementation-plan.md`
kept current; `decisions.md` updated as you go.

**Done when.**

- [ ] Every MVP task in the plan is checked off.
- [ ] Every acceptance check exists as an automated test (or a documented
      manual check) and passes.
- [ ] Every `human` task was reviewed line by line.
- [ ] The artifacts still match what was actually built.

---

# Stage 3 — Ship

The product works and its checks pass. This stage makes it safe to put in front
of real users.

## Phase 9: Verify & harden

**Goal.** Close the gap between "the checks pass" and "it's ready": prove the
real user flows work end to end, then hunt for what the checks don't cover —
security holes, edge cases, poor error handling, missing docs.

**Inputs.** Working, tested code; all artifacts.

**Work.** Two passes:

- **Verify.** Confirm every critical flow in `test-plan.md` has end-to-end
  coverage and passes. Then actually _use_ the product — or have the agent
  drive it (a browser, the CLI, the API) — the way a new user would. Passing
  tests prove what you thought to check; using it finds what you didn't.
- **Harden.** Run an adversarial review across these angles:
  - **Security** — secrets handling, input validation, authn/authz, dependency risks.
  - **Edge cases** — empty states, large inputs, concurrent use, network failure.
  - **Error handling** — does it fail loudly and recoverably, or silently and badly?
  - **Docs** — a README that lets someone else run it; `AGENTS.md` still accurate.

  Use a fresh agent context for the review — one that didn't write the code —
  and dedicated security-review tooling if your agent has it.

Triage what the review finds: fix blockers now (each fix gets a regression
test), and log the rest in `decisions.md` or as deferred items.

**Run.** `/pdev-harden` — [skill](skills/pdev-harden/SKILL.md)

**Output.** End-to-end coverage of critical flows; a triaged findings list;
fixes for blockers; an accurate README.

**Done when.**

- [ ] Every critical flow passes end-to-end, and you've used the product yourself.
- [ ] No known blocker-level issues remain, and each fix has a regression test.
- [ ] Secrets and config are handled properly, not hard-coded.
- [ ] A new person could clone, run, and understand the project from the README.

## Phase 10: Deploy

**Goal.** Get the product running somewhere real users can reach it — repeatably,
not as a one-off.

**Inputs.** A hardened, tested codebase; `tech-stack.md`.

**Work.** Draft [`templates/deployment.md`](templates/deployment.md) with the
agent: target environment, build and release steps, environment variables and
secrets, how to roll back, and how you'll know it's healthy. Automate the
release path in CI so deploying again is boring, and make the health checks
runnable so the agent (or CI) can verify a deploy, not just you. Do a real
deploy. Verify it against the health checks.

Deploying is outward-facing and sometimes hard to undo: keep the actual
production release a step you trigger or approve, even when the agent prepared
everything.

**Run.** `/pdev-deploy` — [skill](skills/pdev-deploy/SKILL.md)

**Output.** `deployment.md`; an automated release path; a live deploy.

**Done when.**

- [ ] The product is reachable by its intended users.
- [ ] Deploying again is a repeatable, automated process, not improvisation.
- [ ] You know how to roll back, and the health checks can be run by a command.

## Phase 11: Iterate

**Goal.** Turn what you learn from real usage into the next iteration — and keep
the artifacts honest.

**Inputs.** A live product; user feedback; usage data; the full artifact set.

**Work.** Collect feedback and observed behavior. With the agent, triage it into
bugs, improvements, and new features. Bugs re-enter the build loop directly —
each one starts as a failing test that reproduces it. Improvements and new
features go back to **Phase 1**: update `project-scope.md`, revisit the
MVP/scope line, and plan the next iteration. The deferred list from phase 3
gets revisited here too.

**Run.** `/pdev-iterate` — [skill](skills/pdev-iterate/SKILL.md)

**Output.** A triaged backlog; updated artifacts; a focus for the next loop.

**Done when.**

- [ ] Feedback is triaged, not sitting in a pile.
- [ ] Every bug to fix has a reproducing test or a task that starts with one.
- [ ] The next iteration's focus is decided and scoped.
- [ ] `project-scope.md` and the deferred list reflect current reality.

Then loop back to Stage 1 for the next iteration.

---

# Cross-cutting principles

These hold in every phase:

- **Context before code.** The agent reads the artifacts before it builds. If
  the artifacts are wrong, the build is wrong.
- **Checks before code.** Every task's "done" is something the agent can run.
  An executable check keeps an autonomous agent honest; prose doesn't.
- **You decide, the agent drafts.** The agent proposes options and trade-offs;
  the decision and its rationale are yours, and they get written down.
- **Review in proportion to risk.** Gates and agent self-review on every
  change; your line-by-line attention on the plan and on anything hard to
  reverse.
- **Never weaken a check to pass it.** If a test seems wrong, that's a
  conversation, not an edit.
- **Small, verifiable units.** One task, one acceptance check, one commit. Big,
  vague tasks are where autonomous agents drift.
- **Keep artifacts in sync.** The moment reality diverges from a document, fix
  the document. A stale artifact actively misleads the agent.
- **Log the why.** `decisions.md` captures decisions and reasoning across every
  phase. Future-you and the agent will both need it.
- **Make the agent disagree with you.** Its most valuable move is finding the
  flaw you can't see — ask for that explicitly.

---

# Appendix: when the product itself uses AI

If your product calls a language model — a chatbot, a summarizer, an agent, a
classifier — a few things need extra care, because model output isn't
deterministic and a test that passes once can fail tomorrow.

- **Phase 3 (MVP).** Write success criteria as measurable quality bars ("90% of
  the sample support tickets are routed to the right queue"), plus cost and
  latency budgets per request.
- **Phase 4 (Spike).** Almost always worth running: try the model on real
  inputs before you design around it. This is where "can the model actually do
  this?" gets answered.
- **Phase 5 (Stack).** Record the model, the provider, and the reason. Treat a
  model change like a dependency upgrade — logged in `decisions.md`, never
  silent.
- **Phase 6 (Plan).** Plan an **eval set**: a versioned collection of
  representative inputs with expected outcomes or grading rules. Evals are this
  product's acceptance checks. Keep prompts in version-controlled files, not
  scattered strings.
- **Phase 8 (Build).** Prompt changes are code changes: they run the evals
  before they land.
- **Phase 9 (Harden).** Add AI-specific angles: prompt injection, leaking data
  across users, harmful or off-topic output, behavior when the provider is slow
  or down, and runaway cost.
- **Phase 10–11 (Deploy, Iterate).** Log inputs and outputs (respecting
  privacy), watch cost and latency, and turn real failures into new eval cases.
