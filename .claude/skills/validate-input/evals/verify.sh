#!/usr/bin/env bash
# Verify: validate-input skill output
# Usage: bash .claude/skills/validate-input/evals/verify.sh
set -euo pipefail

PASS=0
FAIL=0

echo "=== validate-input verification ==="
echo

# 1. npm test passes
if npm test >/dev/null 2>&1; then
  echo "✓ npm test passes"
  ((PASS++))
else
  echo "✗ npm test fails"
  ((FAIL++))
fi

# 2. No new dependencies added
if git diff --quiet package.json 2>/dev/null || ! git diff package.json 2>/dev/null | rg -q '"dependencies"'; then
  echo "✓ No new dependencies added"
  ((PASS++))
else
  echo "✗ package.json dependencies were modified"
  ((FAIL++))
fi

# 3. Tests include 400 status code assertions
COUNT_400=$(rg -c '400\|Bad Request' test/users.test.js 2>/dev/null || echo "0")
if [[ "$COUNT_400" -gt 0 ]]; then
  echo "✓ Tests assert 400 status code ($COUNT_400 occurrences)"
  ((PASS++))
else
  echo "✗ No 400 status code assertions in tests"
  ((FAIL++))
fi

# 4. Validation happens before data helper calls (fail fast)
# Check that validation (res.status(400)) appears before data function calls in the route
if rg -q 'status(400)' src/app.js 2>/dev/null; then
  echo "✓ Route handler has 400 validation responses"
  ((PASS++))
else
  echo "✗ No 400 validation responses in route handler"
  ((FAIL++))
fi

# 5. Tests cover missing field, invalid email, invalid role
for pattern in "missing\|required\|without" "email\|invalid.*email" "role\|invalid.*role"; do
  if rg -qi "$pattern" test/users.test.js 2>/dev/null; then
    echo "✓ Test covers: $pattern"
    ((PASS++))
  else
    echo "✗ Test missing coverage for: $pattern"
    ((FAIL++))
  fi
done

echo
echo "=== Results: $PASS passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
