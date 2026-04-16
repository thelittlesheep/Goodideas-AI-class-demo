---
name: debug-test
description: >
  Diagnose and fix a failing test in this Express Users API using a structured debugging workflow.
---

Diagnose and fix a failing test in this Express Users API using a structured debugging workflow.

Context:
- Tests use node:test + supertest, located in test/users.test.js
- Each describe block uses beforeEach(() => resetData()) for test isolation
- ID params must use Number(), not parseInt()
- Error responses are { error: "..." } with HTTP 400 or 404

Steps:
1. RUN npm test and capture the full output. Identify the failing describe/it block, the assertion error message, and line number
2. READ the failing test code in the test file. Note the expected value vs actual value
3. TRACE the code path in src/app.js and src/data.js that the failing test exercises
4. DIAGNOSE the root cause — determine if: (a) the implementation has a bug, (b) the test expectation is wrong, or (c) test isolation is broken (missing resetData)
5. PROPOSE the fix with reasoning. WAIT for my approval before writing code
6. IMPLEMENT the minimal fix — only change the file that contains the bug, do not refactor surrounding code
7. VERIFY: Run npm test — ALL tests must pass (both the previously failing test and all others)
8. VALIDATE: Run `bash .claude/skills/debug-test/evals/verify.sh` to confirm all constraints are met (0 failures, minimal fix)

Failing test: $ARGUMENTS
