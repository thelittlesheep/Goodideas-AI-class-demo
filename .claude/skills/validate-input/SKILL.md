---
name: validate-input
description: >
  Add input validation to a route in this Express Users API.
---

Add input validation to a route in this Express Users API.

Context:
- This API has no validation library — use plain JavaScript checks
- Valid roles are: admin, user, moderator
- All validation errors must return HTTP 400 with { error: "..." }
- Do not install any new dependencies

Steps:
1. READ the target route in src/app.js to understand the current request body handling
2. IDENTIFY required fields, format constraints, and enum values for this route
3. IMPLEMENT validation at the top of the route handler — fail fast before calling data helpers
4. TEST: Add test cases in test/users.test.js for each validation rule (missing field → 400, invalid email → 400, invalid role → 400)
5. VERIFY: Run npm test — all tests must pass
6. VALIDATE: Run `bash .claude/skills/validate-input/evals/verify.sh` to confirm all constraints are met

Route to validate: $ARGUMENTS
