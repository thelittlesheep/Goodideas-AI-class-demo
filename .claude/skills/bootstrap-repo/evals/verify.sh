#!/usr/bin/env bash
# Verify: bootstrap-repo skill output
# Usage: bash .claude/skills/bootstrap-repo/evals/verify.sh <output-file>
# The output file should contain the saved summary from the skill run.
set -euo pipefail

OUTPUT="${1:?Usage: verify.sh <output-file-with-summary>}"
PASS=0
FAIL=0

echo "=== bootstrap-repo verification ==="
echo

if [[ ! -f "$OUTPUT" ]]; then
  echo "✗ Output file not found: $OUTPUT"
  exit 1
fi

# 1. Contains project description
if rg -qi "description\|overview\|project" "$OUTPUT" 2>/dev/null; then
  echo "✓ Contains project description"
  ((PASS++))
else
  echo "✗ Missing project description"
  ((FAIL++))
fi

# 2. Contains architecture diagram
if rg -qi "architecture\|diagram\|structure" "$OUTPUT" 2>/dev/null; then
  echo "✓ Contains architecture section"
  ((PASS++))
else
  echo "✗ Missing architecture section"
  ((FAIL++))
fi

# 3. Contains conventions
if rg -qi "convention\|constraint\|rule" "$OUTPUT" 2>/dev/null; then
  echo "✓ Contains conventions section"
  ((PASS++))
else
  echo "✗ Missing conventions section"
  ((FAIL++))
fi

# 4. Contains risks / tech debt
if rg -qi "risk\|debt\|issue\|caveat" "$OUTPUT" 2>/dev/null; then
  echo "✓ Contains risks / tech debt section"
  ((PASS++))
else
  echo "✗ Missing risks / tech debt section"
  ((FAIL++))
fi

# 5. Contains first steps
if rg -qi "first step\|getting started\|contributor\|start" "$OUTPUT" 2>/dev/null; then
  echo "✓ Contains first steps section"
  ((PASS++))
else
  echo "✗ Missing first steps section"
  ((FAIL++))
fi

# 6. Word count under 300
WORD_COUNT=$(wc -w <"$OUTPUT" | tr -d ' ')
if [[ "$WORD_COUNT" -le 300 ]]; then
  echo "✓ Word count is $WORD_COUNT (≤ 300)"
  ((PASS++))
else
  echo "✗ Word count is $WORD_COUNT (> 300)"
  ((FAIL++))
fi

echo
echo "=== Results: $PASS passed, $FAIL failed ==="
[[ $FAIL -eq 0 ]] && exit 0 || exit 1
