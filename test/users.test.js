const { describe, it, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");
const { resetData } = require("../src/data");

describe("GET /users", () => {
  beforeEach(() => resetData());

  it("returns all users as an array when no pagination params", async () => {
    const res = await request(app).get("/users");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length >= 15);
  });

  it("returns paginated results with total count", async () => {
    const res = await request(app).get("/users?page=1&limit=5");
    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 5);
    assert.equal(res.body.total, 18);
    assert.equal(res.body.page, 1);
    assert.equal(res.body.limit, 5);
  });

  it("returns correct second page", async () => {
    const res = await request(app).get("/users?page=2&limit=5");
    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 5);
    assert.equal(res.body.data[0].id, 6);
  });

  it("returns partial results on last page", async () => {
    const res = await request(app).get("/users?page=4&limit=5");
    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 3);
    assert.equal(res.body.total, 18);
  });

  it("returns empty array when page exceeds total", async () => {
    const res = await request(app).get("/users?page=100&limit=5");
    assert.equal(res.status, 200);
    assert.equal(res.body.data.length, 0);
    assert.equal(res.body.total, 18);
  });

  it("returns 400 for invalid page", async () => {
    const res = await request(app).get("/users?page=0&limit=5");
    assert.equal(res.status, 400);
  });

  it("returns 400 for negative page", async () => {
    const res = await request(app).get("/users?page=-1&limit=5");
    assert.equal(res.status, 400);
  });

  it("returns 400 for non-numeric page", async () => {
    const res = await request(app).get("/users?page=abc&limit=5");
    assert.equal(res.status, 400);
  });

  it("returns 400 for limit exceeding 100", async () => {
    const res = await request(app).get("/users?page=1&limit=101");
    assert.equal(res.status, 400);
  });

  it("returns 400 for limit of 0", async () => {
    const res = await request(app).get("/users?page=1&limit=0");
    assert.equal(res.status, 400);
  });

  it("returns 400 for non-numeric limit", async () => {
    const res = await request(app).get("/users?page=1&limit=abc");
    assert.equal(res.status, 400);
  });

  it("returns 400 when only page is provided", async () => {
    const res = await request(app).get("/users?page=1");
    assert.equal(res.status, 400);
  });

  it("returns 400 when only limit is provided", async () => {
    const res = await request(app).get("/users?limit=5");
    assert.equal(res.status, 400);
  });
});

describe("GET /users/:id", () => {
  beforeEach(() => resetData());

  it("returns the correct user", async () => {
    const res = await request(app).get("/users/1");
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 1);
    assert.equal(res.body.name, "Alice Chen");
  });

  it("returns 404 for non-existent user", async () => {
    const res = await request(app).get("/users/9999");
    assert.equal(res.status, 404);
  });
});

describe("GET /users/:id/role", () => {
  beforeEach(() => resetData());

  it("returns the role of an existing user", async () => {
    const res = await request(app).get("/users/1/role");
    assert.equal(res.status, 200);
    assert.equal(res.body.role, "admin");
  });

  it("returns 404 for non-existent user", async () => {
    const res = await request(app).get("/users/9999/role");
    assert.equal(res.status, 404);
  });
});

describe("POST /users", () => {
  beforeEach(() => resetData());

  it("creates a new user", async () => {
    const newUser = { name: "Test User", email: "test@example.com", role: "user" };
    const res = await request(app).post("/users").send(newUser);
    assert.equal(res.status, 201);
    assert.ok(res.body.id);
    assert.equal(res.body.name, "Test User");
  });
});

describe("PUT /users/:id", () => {
  beforeEach(() => resetData());

  it("updates an existing user", async () => {
    const res = await request(app).put("/users/1").send({ name: "Updated Alice" });
    assert.equal(res.status, 200);
    assert.equal(res.body.name, "Updated Alice");
  });

  it("returns 404 for non-existent user", async () => {
    const res = await request(app).put("/users/9999").send({ name: "Nope" });
    assert.equal(res.status, 404);
  });
});

describe("DELETE /users/:id", () => {
  beforeEach(() => resetData());

  it("deletes an existing user", async () => {
    const res = await request(app).delete("/users/1");
    assert.equal(res.status, 204);
  });

  it("returns 404 for non-existent user", async () => {
    const res = await request(app).delete("/users/9999");
    assert.equal(res.status, 404);
  });
});
