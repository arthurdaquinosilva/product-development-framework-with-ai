# Product Development Framework With AI

<!-- TOC -->

- [Why this exists](#why-this-exists)
- [The lifecycle](#the-lifecycle)
- [How to use it](#how-to-use-it)
- [Using other agents](#using-other-agents)
- [Repository layout](#repository-layout)
- [Principles](#principles)
- [License](#license)
<!-- /TOC -->

A repeatable framework for taking a product from a rough idea all the way to a
deployed release — with an AI coding agent as your collaborator at every step.

This is not a tool or a library. It is a **process**, plus a set of **artifact
templates** and **skills** (the prompts for each phase, packaged so your agent
can run them). It's built for Claude Code and works with any capable coding
agent.

## Why this exists

AI agents are excellent at producing code, but they are only as good as the
context they are given. Jumping straight to _"build me an app"_ produces
throwaway work: the agent guesses at scope, invents requirements, and picks a
stack you never agreed to.

And now that agents work autonomously for long stretches, a second problem
matters just as much: **how does the agent know it's done?** An agent that can
only read prose stops when it _thinks_ it's finished. An agent with an
executable check keeps going until the check passes.

This framework front-loads the thinking — scope, requirements, MVP, stack, plan
— into durable documents the agent reads _before_ it writes code, turns every
task's definition of done into a check the agent can run, and keeps the
documents in sync through build, verification, and deploy.

## The lifecycle

Three stages, eleven phases. Each phase has a goal, a skill, and an artifact.

### Plan

1. **Define the scope** — what are we building and why? _(just you)_
2. **Clarify the requirements** — what exactly should it do?
3. **Define the MVP** — what's the smallest version worth shipping, and how will we know it worked?
4. **Spike the unknowns** — answer the riskiest questions with throwaway code. _(optional)_
5. **Choose the tech stack** — what do we build it with, including how we verify it?
6. **Plan the build** — tasks with acceptance checks, parallel groups, and review levels.

### Build

7. **Set up the project** — skeleton, automated gates in CI, and the agent's working context.
8. **Build (the loop)** — the agent builds each task check-first until every gate passes; you review in proportion to risk.

### Ship

9. **Verify & harden** — end-to-end flows, real use, and an adversarial review.
10. **Deploy** — a repeatable, automated release with runnable health checks.
11. **Iterate** — triage feedback and feed it back into the plan.

Read [FRAMEWORK.md](FRAMEWORK.md) for the full phase-by-phase walkthrough, and
[EXAMPLE.md](EXAMPLE.md) for a complete worked example.

## How to use it

Clone this repo and install the `pdev-init` command once (requires Node.js 16+):

```
bash install.sh
```

Then, from inside any project directory:

```
pdev-init
```

It asks for a language, a target directory, and a docs folder name (or pass
`--lang`, `--dir`, `--docs`, `--yes`), then:

- copies the artifact templates into `docs/`, and `AGENTS.md` + `CLAUDE.md`
  into the project root;
- installs the phase skills into `.claude/skills/`;
- installs a small Claude Code hook that reminds the agent to update the plan
  and decision log when code changed but no artifact did (skip skills and hook
  with `--no-claude`).

It never overwrites an artifact that already exists, so re-running it in an
existing project is how you upgrade to the latest skills.

Then:

1. Fill in `docs/project-scope.md` yourself — rough is fine.
2. Open the project in Claude Code and run **`/pdev`**. It reads your artifacts,
   tells you which phase you're in, and gives you the next command
   (`/pdev-clarify`, `/pdev-plan`, `/pdev-build A.2`, …).
3. Commit the artifacts. They are **living documents** — the agent reads them
   for context on every task and updates them as the product evolves.

## Using other agents

The skills are plain markdown files (`SKILL.md`). Agents that support the
skills format can load them from their own skills folder. With any other
agent, paste the body of the phase's skill as your prompt — e.g. the contents
of `.claude/skills/pdev-plan/SKILL.md` for phase 6. `AGENTS.md` is read
natively by most coding agents; `CLAUDE.md` just imports it.

## Repository layout

```
README.md                      you are here
FRAMEWORK.md                   the methodology, phase by phase
EXAMPLE.md                     a complete worked example
templates/
  project-scope.md             phases 1–2
  mvp.md                       phase 3
  spikes.md                    phase 4 (optional)
  tech-stack.md                phase 5
  implementation-plan.md       phase 6, updated through the build
  test-plan.md                 phase 6, extended in phase 9
  AGENTS.md                    phase 7 — the agent's working context
  CLAUDE.md                    imports AGENTS.md for Claude Code
  deployment.md                phase 10
  decisions.md                 running log, updated across every phase
skills/
  pdev/                        the guide: where am I, what's next?
  pdev-clarify/ … pdev-iterate/  one skill per phase (2–11)
```

The installer itself (`bin/`, `hooks/`, `install.sh`, `setup.sh`) lives at the
repository root.

## Principles

- **Context before code.** The agent reads the artifacts before it builds.
- **Checks before code.** Every task's "done" is something the agent can run.
- **You decide, the agent drafts.** The agent proposes; you own every decision.
- **Review in proportion to risk.** Gates on every change; your close attention
  on the plan and on what's hard to reverse.
- **Living documents.** Artifacts are updated as reality changes, not written once.

## License

MIT — see [LICENSE](../LICENSE).
