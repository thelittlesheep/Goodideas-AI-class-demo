Add a new endpoint to this Express Users API following existing conventions.

Steps:
1. UNDERSTAND: Clarify what the endpoint does, its HTTP method, path, and expected request/response shape
2. CHECK: Read src/app.js and src/data.js to understand existing patterns before writing anything
3. PLAN: List every file to modify (at minimum: src/app.js; add to src/data.js only if a new data helper is needed)
4. WAIT for my approval before writing any code
5. IMPLEMENT: Add the route to src/app.js following the existing pattern (getById for 404, Number() for id params, res.status().json() for errors)
6. TEST: Add a describe block in test/users.test.js with beforeEach(() => resetData()) — cover success case + 404/400 cases
7. VERIFY: Run npm test — all tests must pass

Endpoint to add: $ARGUMENTS
