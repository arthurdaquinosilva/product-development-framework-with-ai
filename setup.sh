#!/usr/bin/env bash
set -euo pipefail

# Resolve symlinks so this works when invoked via a symlinked global command
SCRIPT_DIR="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"

# Verify we're running from the framework repo
if [[ ! -d "$SCRIPT_DIR/en" || ! -d "$SCRIPT_DIR/pt-br" ]]; then
  echo "Error: run this script from the framework repository root."
  exit 1
fi

echo ""
echo "Product Development Framework With AI — Setup"
echo "=============================================="
echo ""

# Language
echo "Language / Idioma:"
echo "  1) English"
echo "  2) Português (Brasil)"
echo ""
read -rp "Choose / Escolha [1]: " lang_choice
lang_choice=${lang_choice:-1}

case "$lang_choice" in
  2) LANG="pt-br" ;;
  *) LANG="en" ;;
esac

echo ""

# Target directory
read -rp "Target project directory / Diretório do projeto [.]: " TARGET
TARGET=${TARGET:-.}
TARGET=${TARGET/#\~/$HOME}
TARGET=$(cd "$TARGET" 2>/dev/null && pwd || echo "$TARGET")

# Docs directory name
if [[ "$LANG" == "pt-br" ]]; then
  read -rp "Nome da pasta de documentos [docs]: " DOCS
else
  read -rp "Docs folder name [docs]: " DOCS
fi
DOCS=${DOCS:-docs}

echo ""

# Warn if docs folder already exists
if [[ -d "$TARGET/$DOCS" ]]; then
  read -rp "⚠  $TARGET/$DOCS already exists. Continue? [y/N]: " confirm
  confirm=${confirm:-N}
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Aborted."
    exit 0
  fi
fi

echo "Setting up in $TARGET ..."
echo ""

mkdir -p "$TARGET/$DOCS"

# Copy templates — CLAUDE.md and AGENTS.md go to project root, rest to docs/
for f in "$SCRIPT_DIR/$LANG/templates/"*.md; do
  fname=$(basename "$f")
  if [[ "$fname" == "CLAUDE.md" || "$fname" == "AGENTS.md" ]]; then
    cp "$f" "$TARGET/$fname"
    echo "  ✓ $fname → (project root)"
  else
    cp "$f" "$TARGET/$DOCS/$fname"
    echo "  ✓ $fname → $DOCS/"
  fi
done

# Fix artifact paths in AGENTS.md and CLAUDE.md if docs folder isn't "docs"
if [[ "$DOCS" != "docs" ]]; then
  sed -i "s|docs/|$DOCS/|g" "$TARGET/AGENTS.md" "$TARGET/CLAUDE.md"
fi

echo ""

if [[ "$LANG" == "pt-br" ]]; then
  echo "Pronto! Próximos passos:"
  echo ""
  echo "  1. Preencha $DOCS/project-scope.md com sua ideia inicial"
  echo "  2. Inicie o modo guiado:"
  echo "       Claude Code → o CLAUDE.md já está na raiz, abra o projeto"
  echo "       Outro agente → cole o conteúdo de $SCRIPT_DIR/$LANG/GUIDE.md na sua sessão de IA"
  echo "  3. Siga as 11 fases do framework"
else
  echo "Done! Next steps:"
  echo ""
  echo "  1. Fill in $DOCS/project-scope.md with your initial idea"
  echo "  2. Start guided mode:"
  echo "       Claude Code  → CLAUDE.md is already at the root, open the project"
  echo "       Other agents → paste the contents of $SCRIPT_DIR/$LANG/GUIDE.md into your AI session"
  echo "  3. Follow the 11 phases of the framework"
fi

echo ""
