#!/bin/bash
# Subagent PreToolUse hook for api-reader: only allow curl GET requests
set -euo pipefail

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [[ -z "$CMD" ]]; then
  exit 0
fi

# Block explicit write methods
if echo "$CMD" | grep -iE '(-X[[:space:]]+|--request[[:space:]]+)(POST|PUT|DELETE|PATCH)' >/dev/null; then
  echo "BLOCKED: api-reader 只能執行 GET 請求" >&2
  exit 2
fi

# Only allow curl as the entry command
if ! echo "$CMD" | grep -qE '^[[:space:]]*curl[[:space:]]'; then
  echo "BLOCKED: api-reader 只能執行 curl 指令（目前：$CMD）" >&2
  exit 2
fi

exit 0
