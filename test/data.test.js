const { describe, it, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { getAll, getById, create, update, remove, resetData } = require("../src/data");

describe("data helpers", () => {
  beforeEach(() => {
    resetData();
  });

  it("getAll returns all users", () => {
    const users = getAll();
    assert.ok(Array.isArray(users));
    assert.ok(users.length >= 15);
  });

  it("getById returns correct user", () => {
    const user = getById(1);
    assert.equal(user.id, 1);
    assert.ok(user.name);
    assert.ok(user.email);
    assert.ok(user.role);
  });

  it("getById returns undefined for missing user", () => {
    const user = getById(9999);
    assert.equal(user, undefined);
  });

  it("create adds a new user with auto-incremented id", () => {
    const before = getAll().length;
    const user = create({ name: "Test", email: "test@test.com", role: "user" });
    assert.ok(user.id);
    assert.equal(user.name, "Test");
    assert.equal(getAll().length, before + 1);
  });

  it("update modifies existing user", () => {
    const updated = update(1, { name: "Updated" });
    assert.equal(updated.name, "Updated");
    assert.equal(getById(1).name, "Updated");
  });

  it("update returns null for missing user", () => {
    const result = update(9999, { name: "Nope" });
    assert.equal(result, null);
  });

  it("remove deletes user and returns true", () => {
    const before = getAll().length;
    const result = remove(1);
    assert.equal(result, true);
    assert.equal(getAll().length, before - 1);
  });

  it("remove returns false for missing user", () => {
    const result = remove(9999);
    assert.equal(result, false);
  });
});
