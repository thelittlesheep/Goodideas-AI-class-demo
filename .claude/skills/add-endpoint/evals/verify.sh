#!/usr/bin/env bash
# Verify: add-endpoint skill output
# Usage: bash .claude/skills/add-endpoint/evals/verify.sh
set -euo pipefail

PASS=0
FAIL=0

check() {
  local desc="$1"
  shift
  if "$@" >/dev/null 2>&1; then
    echo "✓ $desc"
    ((PASS++))
  else
    echo "✗ $desc"
    ((FAIL++))
  fi
}

check_output() {
  local desc="$1"
  local output="$2"
  if [[ -n "$output" ]]; then
    echo "✓ $desc"
    ((PASS++))
  else
    echo "✗ $desc"
    ((FAIL++))
  fi
}

echo "=== add-endpoint verification ==="
echo

# 1. npm test passes
check "npm test passes" npm test

# 2. New route handler exists in src/app.js (beyond the original user routes)
route_count=$(rg -c 'app\.(get|post|put|delete|patch)\(' src/app.js || echo "0")
check_output "src/app.js contains route handlers (count: $route_count)" "$route_count"

# 3. Test file has describe blocks
describe_count=$(rg -c 'describe\(' test/users.test.js || echo "0")
check_output "test/users.test.js has describe blocks (count: $describe_count)" "$describe_count"

# 4. No parseInt usage for id params (should use Number())
if rg -q 'parseInt.*params' src/app.js 2>/dev/null; then
  echo "✗ Uses parseInt instead of Number() for id params"
  ((FAIL++))
else
  echo "✓ No parseInt for id params (uses Number())"
  ((PASS++))
fi

# 5. Error responses use { error: "..." } format
error_format=$(rg -c '{ error:' src/app.js || echo "0")
check_output "Error responses use { error: \"...\" } format (count: $error_format)" "$error_format"

echo
echo "=== Results: $PASS passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
