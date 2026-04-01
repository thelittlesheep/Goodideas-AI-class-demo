const { describe, it, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");
const { resetData } = require("../src/data");

describe("GET /users", () => {
  beforeEach(() => resetData());

  it("returns all users as an array", async () => {
    const res = await request(app).get("/users");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length >= 15);
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
