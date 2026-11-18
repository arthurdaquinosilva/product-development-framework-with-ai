#!/usr/bin/env bash
# Runs the framework installer (bin/pdev-init.js). All options are passed
# through — see `setup.sh --help`.
set -euo pipefail

# Resolve symlinks so this works when invoked via the symlinked global command.
SCRIPT_DIR="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js 16+ is required (https://nodejs.org)."
  exit 1
fi

exec node "$SCRIPT_DIR/bin/pdev-init.js" "$@"
