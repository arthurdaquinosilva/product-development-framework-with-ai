# AGENTS.md

<!--
  The first file every agent reads on every task. CLAUDE.md imports it, so this
  is the single source of project context for all agents. Filled in during
  Phase 7 (/pdev-setup); kept short and current after that.
  See FRAMEWORK.md → Phase 7.
-->

## Process

This project follows the **Product Development Framework With AI**. Planning
artifacts live in `docs/` (see the artifact map below). Phase skills live in
`.claude/skills/` — run `/pdev` to see which phase the project is in and what
to do next.

## Project overview

<!-- Two or three sentences: what this product is and who it's for. Summarize
     docs/project-scope.md — don't duplicate it. -->

## Run

<!-- The exact commands to install and run the project. -->

```
# install
# run
```

## Definition of done

<!-- The gates every change must pass before it counts as done. Same commands
     CI runs. Copy them from docs/test-plan.md. -->

```
# test
# lint / format check
# type check
```

A task is done when its acceptance check and every command above pass, the
diff has been self-reviewed, and `docs/implementation-plan.md` and
`docs/decisions.md` are updated.

## Conventions

<!-- Structure, naming, formatting, commit message style, branching. What should
     the agent's output look like so it's indistinguishable from yours? -->

-

## Working autonomously

<!-- What the agent may do on its own, and when it must stop. Adjust to taste. -->

You may, without asking: read anything in the repo, run the gates, write and
change code and tests inside the current task's scope, and update the planning
artifacts to reflect what you did.

Stop and ask when: the spec is ambiguous or artifacts contradict each other;
the task is growing beyond the plan; a change hits a human-review trigger
below; or the only way to pass a check is to change the check.

Commits: <!-- e.g. "wait for my review before committing" or "commit each
finished task yourself; never push" -->

## Human-review triggers

<!-- Changes the developer must review line by line, even if every gate passes.
     Tasks touching these are marked `Review: human` in the plan. -->

- Data formats, schemas, and migrations
- Authentication, authorization, and anything handling secrets
- Payments or other money flows
- Public interfaces (APIs, CLI flags, file formats other tools depend on)
- Deployment and CI configuration
- Anything that deletes user data

## Guardrails

<!-- What the agent must never do. -->

- Never weaken, skip, or delete a test or check to make it pass.
- Never commit secrets or hard-code credentials.
- Never add a dependency without asking.
- Never push, deploy, or publish without being asked.
- Never delete files you didn't create in this task without asking.

## Artifact map

- Scope & requirements — `docs/project-scope.md`
- MVP definition — `docs/mvp.md`
- Spike findings — `docs/spikes.md`
- Tech stack — `docs/tech-stack.md`
- Implementation plan — `docs/implementation-plan.md`
- Test plan — `docs/test-plan.md`
- Deployment — `docs/deployment.md`
- Decision log — `docs/decisions.md`
