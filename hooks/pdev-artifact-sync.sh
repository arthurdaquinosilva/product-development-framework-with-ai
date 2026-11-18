#!/usr/bin/env bash
# pdev artifact-sync reminder — a Claude Code "Stop" hook.
#
# When the agent finishes a turn with uncommitted code changes but no change to
# the planning artifacts, remind it (once per working-tree state) to update the
# implementation plan and decision log. It is a reminder, not a gate: if
# nothing needs updating, the agent says so and stops.
#
# Installed by pdev-init into .claude/hooks/ and registered in
# .claude/settings.json. Remove the "Stop" entry there to turn it off.

DOCS_DIR="__PDEV_DOCS__"
LANG_CODE="__PDEV_LANG__"

input=$(cat)

# Never block twice in a row (prevents loops).
if printf '%s' "$input" | grep -Eq '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

changes=$(git status --porcelain --untracked-files=all 2>/dev/null) || exit 0
[ -z "$changes" ] && exit 0

# Paths that are not "code": the artifacts, agent context, and agent config.
not_code="^.. \"?(${DOCS_DIR}/|AGENTS\\.md|CLAUDE\\.md|\\.claude/)"
code_changes=$(printf '%s\n' "$changes" | grep -Ev "$not_code")
[ -z "$code_changes" ] && exit 0

doc_changes=$(printf '%s\n' "$changes" | grep -E "^.. \"?${DOCS_DIR}/")
[ -n "$doc_changes" ] && exit 0

# Remind only once per distinct working-tree state.
git_dir=$(git rev-parse --git-dir 2>/dev/null) || exit 0
state_file="$git_dir/pdev-artifact-sync"
state=$( { printf '%s\n' "$changes"; git diff HEAD 2>/dev/null; } | cksum)
if [ -f "$state_file" ] && [ "$(cat "$state_file" 2>/dev/null)" = "$state" ]; then
  exit 0
fi
printf '%s' "$state" > "$state_file" 2>/dev/null

if [ "$LANG_CODE" = "pt-br" ]; then
  echo "pdev: há mudanças de código não commitadas, mas nenhum artefato em ${DOCS_DIR}/ mudou. Se este trabalho concluiu ou alterou uma tarefa, ou tomou uma decisão que vale registrar, atualize ${DOCS_DIR}/implementation-plan.md e ${DOCS_DIR}/decisions.md agora. Se nada precisa mudar, diga isso em uma linha e encerre." >&2
else
  echo "pdev: code changed but no planning artifact under ${DOCS_DIR}/ did. If this work completed or changed a task, or made a decision worth logging, update ${DOCS_DIR}/implementation-plan.md and ${DOCS_DIR}/decisions.md now. If nothing needs updating, say so in one line and stop." >&2
fi
exit 2
