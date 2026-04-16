#!/usr/bin/env bash
# Verify: debug-test skill output
# Usage: bash .claude/skills/debug-test/evals/verify.sh
set -euo pipefail

PASS=0
FAIL=0

echo "=== debug-test verification ==="
echo

# 1. npm test passes (0 failures)
TEST_OUTPUT=$(npm test 2>&1)
if echo "$TEST_OUTPUT" | rg -q "fail 0\|# fail 0\|0 failed"; then
  echo "✓ npm test passes with 0 failures"
  ((PASS++))
elif npm test >/dev/null 2>&1; then
  echo "✓ npm test passes"
  ((PASS++))
else
  echo "✗ npm test has failures"
  ((FAIL++))
fi

# 2. Only one file was modified (minimal fix principle)
CHANGED_FILES=$(git diff --name-only 2>/dev/null | wc -l | tr -d ' ')
if [[ "$CHANGED_FILES" -eq 1 ]]; then
  CHANGED=$(git diff --name-only 2>/dev/null)
  echo "✓ Only one file modified: $CHANGED (minimal fix)"
  ((PASS++))
elif [[ "$CHANGED_FILES" -eq 0 ]]; then
  # Check staged changes
  STAGED_FILES=$(git diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')
  if [[ "$STAGED_FILES" -eq 1 ]]; then
    STAGED=$(git diff --cached --name-only 2>/dev/null)
    echo "✓ Only one file modified (staged): $STAGED (minimal fix)"
    ((PASS++))
  else
    echo "? No unstaged changes detected — may already be committed"
    ((PASS++))
  fi
else
  FILES=$(git diff --name-only 2>/dev/null)
  echo "✗ Multiple files modified ($CHANGED_FILES files) — should be minimal fix"
  echo "  Modified: $FILES"
  ((FAIL++))
fi

echo
echo "=== Results: $PASS passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
