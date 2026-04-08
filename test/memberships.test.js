const { describe, it, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");
const { resetData } = require("../src/membership");
const { resetData: resetUsers } = require("../src/data");

describe("GET /memberships", () => {
  beforeEach(() => resetData());

  it("returns all memberships as an array", async () => {
    const res = await request(app).get("/memberships");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.equal(res.body.length, 5);
  });

  it("each membership has the expected fields", async () => {
    const res = await request(app).get("/memberships");
    const m = res.body[0];
    assert.ok(m.id);
    assert.ok(m.userId);
    assert.ok(m.plan);
    assert.ok(m.status);
    assert.ok(m.startDate);
    assert.ok(m.endDate);
  });
});

describe("GET /memberships/:id", () => {
  beforeEach(() => resetData());

  it("returns the correct membership", async () => {
    const res = await request(app).get("/memberships/1");
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 1);
    assert.equal(res.body.userId, 1);
    assert.equal(res.body.plan, "premium");
    assert.equal(res.body.status, "active");
  });

  it("returns 404 for non-existent membership", async () => {
    const res = await request(app).get("/memberships/9999");
    assert.equal(res.status, 404);
    assert.equal(res.body.error, "Membership not found");
  });
});

describe("POST /memberships", () => {
  beforeEach(() => { resetData(); resetUsers(); });

  it("creates a new membership", async () => {
    const newMembership = {
      userId: 10,
      plan: "basic",
      status: "active",
      startDate: "2026-01-01",
      endDate: "2027-01-01",
    };
    const res = await request(app).post("/memberships").send(newMembership);
    assert.equal(res.status, 201);
    assert.ok(res.body.id);
    assert.equal(res.body.userId, 10);
    assert.equal(res.body.plan, "basic");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app).post("/memberships").send({ userId: 10 });
    assert.equal(res.status, 400);
    assert.ok(res.body.error);
  });

  it("returns 400 for invalid plan", async () => {
    const res = await request(app).post("/memberships").send({
      userId: 10, plan: "gold", status: "active", startDate: "2026-01-01", endDate: "2027-01-01",
    });
    assert.equal(res.status, 400);
    assert.match(res.body.error, /plan/);
  });

  it("returns 400 for invalid status", async () => {
    const res = await request(app).post("/memberships").send({
      userId: 10, plan: "basic", status: "pending", startDate: "2026-01-01", endDate: "2027-01-01",
    });
    assert.equal(res.status, 400);
    assert.match(res.body.error, /status/);
  });

  it("returns 400 for non-existent userId", async () => {
    const res = await request(app).post("/memberships").send({
      userId: 9999, plan: "basic", status: "active", startDate: "2026-01-01", endDate: "2027-01-01",
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.error, "User not found");
  });
});

describe("PUT /memberships/:id", () => {
  beforeEach(() => { resetData(); resetUsers(); });

  it("updates an existing membership", async () => {
    const res = await request(app).put("/memberships/1").send({ plan: "basic" });
    assert.equal(res.status, 200);
    assert.equal(res.body.plan, "basic");
    assert.equal(res.body.id, 1);
  });

  it("returns 404 for non-existent membership", async () => {
    const res = await request(app).put("/memberships/9999").send({ plan: "free" });
    assert.equal(res.status, 404);
    assert.equal(res.body.error, "Membership not found");
  });

  it("returns 400 for invalid plan", async () => {
    const res = await request(app).put("/memberships/1").send({ plan: "gold" });
    assert.equal(res.status, 400);
    assert.match(res.body.error, /plan/);
  });

  it("returns 400 for invalid status", async () => {
    const res = await request(app).put("/memberships/1").send({ status: "pending" });
    assert.equal(res.status, 400);
    assert.match(res.body.error, /status/);
  });

  it("returns 400 for non-existent userId", async () => {
    const res = await request(app).put("/memberships/1").send({ userId: 9999 });
    assert.equal(res.status, 400);
    assert.equal(res.body.error, "User not found");
  });
});

describe("DELETE /memberships/:id", () => {
  beforeEach(() => resetData());

  it("deletes an existing membership", async () => {
    const res = await request(app).delete("/memberships/1");
    assert.equal(res.status, 204);
  });

  it("returns 404 for non-existent membership", async () => {
    const res = await request(app).delete("/memberships/9999");
    assert.equal(res.status, 404);
  });
});
