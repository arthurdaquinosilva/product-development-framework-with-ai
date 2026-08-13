#!/usr/bin/env bash
set -euo pipefail

CMD_NAME="pdev-init"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SETUP="$REPO_DIR/setup.sh"
BIN_DIR="$HOME/.local/bin"
LINK="$BIN_DIR/$CMD_NAME"

# Verify we're running from the framework repo
if [[ ! -f "$SETUP" || ! -d "$REPO_DIR/en" || ! -d "$REPO_DIR/pt-br" ]]; then
  echo "Error: run install.sh from the framework repository root."
  exit 1
fi

echo ""
echo "Product Development Framework With AI — Install"
echo "==============================================="
echo ""

mkdir -p "$BIN_DIR"

# Handle an existing entry at the target path
if [[ -e "$LINK" || -L "$LINK" ]]; then
  if [[ -L "$LINK" && "$(readlink -f "$LINK")" == "$SETUP" ]]; then
    echo "  '$CMD_NAME' is already installed — refreshing the link."
  else
    read -rp "  ⚠  $LINK already exists. Overwrite? [y/N]: " confirm
    confirm=${confirm:-N}
    if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
      echo "Aborted."
      exit 0
    fi
  fi
  rm -f "$LINK"
fi

chmod +x "$SETUP"
ln -s "$SETUP" "$LINK"
echo "  ✓ $LINK"
echo ""

# Check whether the bin directory is on PATH
case ":${PATH}:" in
  *":$BIN_DIR:"*)
    echo "Done. From inside any project directory, run:"
    echo ""
    echo "    $CMD_NAME"
    echo ""
    ;;
  *)
    echo "Done — but $BIN_DIR is not on your PATH yet."
    echo "Add this line to your ~/.zshrc, then restart your shell:"
    echo ""
    echo "    export PATH=\"\$HOME/.local/bin:\$PATH\""
    echo ""
    echo "After that, run '$CMD_NAME' from inside any project directory."
    echo ""
    ;;
esac

echo "To uninstall: rm $LINK"
echo ""
