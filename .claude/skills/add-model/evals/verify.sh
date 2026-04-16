#!/usr/bin/env bash
# Verify: add-model skill output
# Usage: bash .claude/skills/add-model/evals/verify.sh <resource>
# Example: bash .claude/skills/add-model/evals/verify.sh product
set -euo pipefail

RESOURCE="${1:?Usage: verify.sh <resource-name>}"
PASS=0
FAIL=0

echo "=== add-model verification (resource: $RESOURCE) ==="
echo

# 1. npm test passes
if npm test >/dev/null 2>&1; then
  echo "✓ npm test passes"
  ((PASS++))
else
  echo "✗ npm test fails"
  ((FAIL++))
fi

# 2. Data file exists
DATA_FILE="src/${RESOURCE}.js"
if [[ -f "$DATA_FILE" ]]; then
  echo "✓ Data file exists: $DATA_FILE"
  ((PASS++))
else
  echo "✗ Data file missing: $DATA_FILE"
  ((FAIL++))
fi

# 3. Data file exports 6 required functions
for fn in getAll getById create update remove resetData; do
  if [[ -f "$DATA_FILE" ]] && rg -q "$fn" "$DATA_FILE" 2>/dev/null; then
    echo "✓ $DATA_FILE exports: $fn"
    ((PASS++))
  else
    echo "✗ $DATA_FILE missing export: $fn"
    ((FAIL++))
  fi
done

# 4. Data file has INITIAL_ seed array
if [[ -f "$DATA_FILE" ]] && rg -q 'INITIAL_' "$DATA_FILE" 2>/dev/null; then
  echo "✓ $DATA_FILE has INITIAL_ seed array"
  ((PASS++))
else
  echo "✗ $DATA_FILE missing INITIAL_ seed array"
  ((FAIL++))
fi

# 5. Routes exist in src/app.js (5 standard routes for the resource)
PLURAL="${RESOURCE}s"
for method in "get.*/${PLURAL}" "get.*/${PLURAL}/:id" "post.*/${PLURAL}" "put.*/${PLURAL}/:id" "delete.*/${PLURAL}/:id"; do
  if rg -qi "$method" src/app.js 2>/dev/null; then
    echo "✓ Route exists: $method"
    ((PASS++))
  else
    echo "✗ Route missing: $method"
    ((FAIL++))
  fi
done

# 6. Test file exists
TEST_FILE="test/${RESOURCE}.test.js"
if [[ -f "$TEST_FILE" ]] || [[ -f "test/${PLURAL}.test.js" ]]; then
  echo "✓ Test file exists"
  ((PASS++))
else
  echo "✗ Test file missing: $TEST_FILE"
  ((FAIL++))
fi

# 7. Test file has describe blocks per HTTP method
ACTUAL_TEST=$(ls "test/${RESOURCE}.test.js" "test/${PLURAL}.test.js" 2>/dev/null | head -1)
if [[ -n "$ACTUAL_TEST" ]]; then
  for method in GET POST PUT DELETE; do
    if rg -q "$method" "$ACTUAL_TEST" 2>/dev/null; then
      echo "✓ Test has describe for: $method"
      ((PASS++))
    else
      echo "✗ Test missing describe for: $method"
      ((FAIL++))
    fi
  done
fi

echo
echo "=== Results: $PASS passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
