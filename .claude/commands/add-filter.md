Add query parameter filtering to an existing list endpoint in this Express Users API.

Context:
- Use plain JavaScript `.filter()` on the in-memory array — no new dependencies
- Filtering must compose correctly with existing pagination (page/limit)
- Exact match for enum fields (e.g. role), case-insensitive substring for text fields (e.g. name)
- Do not modify src/data.js — filtering stays in the route handler

Steps:
1. READ src/app.js to locate the target list route and understand its current query-string handling (pagination may already exist — do not break it)
2. READ src/data.js to confirm which fields exist on the model and their types
3. PLAN the filter strategy: which query params to add, matching approach (exact vs substring), and how filters compose with pagination. Show the plan and WAIT for my approval
4. IMPLEMENT: add `.filter()` on the array from `getAll()` before any pagination slicing. Destructure new query params alongside existing ones at the top of the handler
5. TEST: Add a describe block in test/users.test.js with beforeEach(() => resetData()) — cover: filter returns matching results, no matches returns [], filter combined with pagination, no filter param returns all results unchanged
6. VERIFY: Run npm test — all tests must pass

Filter to add: $ARGUMENTS
