#!/bin/bash
# PostToolUse hook: auto-format with prettier after Write / Edit / MultiEdit
set -euo pipefail

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[[ -z "$FILE" ]] && exit 0

case "$FILE" in
  *.js | *.ts | *.json | *.md | *.css | *.html)
    npx --no-install prettier --write "$FILE" 2>&1 | tail -3 >&2 || true
    ;;
esac

exit 0
