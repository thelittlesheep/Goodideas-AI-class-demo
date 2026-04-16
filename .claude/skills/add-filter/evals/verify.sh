#!/usr/bin/env bash
# Verify: add-filter skill output
# Usage: bash .claude/skills/add-filter/evals/verify.sh
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

echo "=== add-filter verification ==="
echo

# 1. npm test passes
check "npm test passes" npm test

# 2. .filter() is used in src/app.js
if rg -q '\.filter\(' src/app.js 2>/dev/null; then
  echo "✓ src/app.js uses .filter()"
  ((PASS++))
else
  echo "✗ src/app.js does not use .filter()"
  ((FAIL++))
fi

# 3. src/data.js was not modified
if git diff --quiet src/data.js 2>/dev/null; then
  echo "✓ src/data.js was not modified"
  ((PASS++))
else
  echo "✗ src/data.js was modified (should not be)"
  ((FAIL++))
fi

# 4. Tests cover filter scenarios
for pattern in "filter" "no match\|empty\|\[\]" "page\|pagination\|limit"; do
  if rg -qi "$pattern" test/users.test.js 2>/dev/null; then
    echo "✓ Test covers: $pattern"
    ((PASS++))
  else
    echo "✗ Test missing coverage for: $pattern"
    ((FAIL++))
  fi
done

# 5. No new dependencies added
if git diff --quiet package.json 2>/dev/null || ! git diff package.json 2>/dev/null | rg -q '"dependencies"'; then
  echo "✓ No new dependencies added"
  ((PASS++))
else
  echo "✗ package.json dependencies were modified"
  ((FAIL++))
fi

echo
echo "=== Results: $PASS passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
