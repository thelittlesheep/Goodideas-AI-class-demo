#!/bin/bash
# PreToolUse hook: block writes to sensitive files
# Triggered for Write / Edit / MultiEdit tools via .claude/settings.json
set -euo pipefail

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filepath // empty')

if [[ -z "$FILE" ]]; then
  exit 0
fi

if [[ "$FILE" == *.env ]] || [[ "$FILE" == *.env.* ]] ||
  [[ "$FILE" == */migrations/* ]]; then
  echo "BLOCKED: 不允許直接修改 $FILE" >&2
  echo "原因：敏感設定或不可逆變更必須走 PR + 人工 review" >&2
  exit 2
fi

exit 0
