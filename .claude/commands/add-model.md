Scaffold a complete new in-memory data model with CRUD routes and tests for this Express Users API.

Context:
- In-memory storage only — no database or ORM
- New data file must mirror src/data.js exactly: INITIAL_* seed array, getAll/getById/create/update/remove/resetData exports
- Routes go in src/app.js alongside existing routes
- Tests use node:test + supertest with beforeEach(() => resetData())
- Number() for :id params, error format { error: "..." } with 400/404

Steps:
1. UNDERSTAND: Parse the resource name (singular + plural for URLs) and fields from the arguments. Clarify types, constraints, or enums with me if ambiguous
2. READ src/data.js to learn the data layer pattern
3. READ src/app.js to learn the route handler pattern
4. READ test/users.test.js to learn the test structure
5. PLAN: List every file to create or modify. WAIT for my approval before writing code
6. IMPLEMENT src/<resource>.js — seed data with 3-5 rows, all six functions (getAll, getById, create, update, remove, resetData), auto-incrementing id
7. IMPLEMENT routes in src/app.js — require the new data file, add 5 standard routes (GET list, GET by id, POST, PUT, DELETE) following existing conventions
8. IMPLEMENT test/<resource>.test.js — one describe per HTTP method, beforeEach(() => resetData()), cover success + 404/400 cases
9. VERIFY: Run npm test — all tests (existing + new) must pass

Resource to add: $ARGUMENTS
