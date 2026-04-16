const express = require("express");
const { getAll, getById, create, update, remove } = require("./data");
const {
  getAll: getAllMemberships,
  getById: getMembershipById,
  create: createMembership,
  update: updateMembership,
  remove: removeMembership,
} = require("./membership");

const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// GET /users — list users with optional pagination (?page=1&limit=10)
app.get("/users", (req, res) => {
  const { page, limit } = req.query;

  // No pagination params → return all (backward compatible)
  if (page === undefined && limit === undefined) {
    return res.json(getAll());
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  if (!Number.isInteger(pageNum) || pageNum < 1) {
    return res
      .status(400)
      .json({ error: "page must be a positive integer" });
  }
  if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100) {
    return res
      .status(400)
      .json({ error: "limit must be an integer between 1 and 100" });
  }

  const all = getAll();
  const start = (pageNum - 1) * limitNum;
  const data = all.slice(start, start + limitNum);

  res.json({ data, total: all.length, page: pageNum, limit: limitNum });
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  const user = getById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// GET /users/:id/role
app.get("/users/:id/role", (req, res) => {
  const user = getById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ role: user.role });
});

// POST /users
app.post("/users", (req, res) => {
  const { name, email, role } = req.body;
  const user = create({ name, email, role });
  res.status(201).json(user);
});

// PUT /users/:id
app.put("/users/:id", (req, res) => {
  const user = update(Number(req.params.id), req.body);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const deleted = remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "User not found" });
  res.status(204).send();
});

// GET /memberships
app.get("/memberships", (req, res) => {
  res.json(getAllMemberships());
});

// GET /memberships/:id
app.get("/memberships/:id", (req, res) => {
  const membership = getMembershipById(Number(req.params.id));
  if (!membership) return res.status(404).json({ error: "Membership not found" });
  res.json(membership);
});

// POST /memberships
app.post("/memberships", (req, res) => {
  const { userId, plan, status, startDate, endDate } = req.body;

  if (userId === undefined || plan === undefined || status === undefined || startDate === undefined || endDate === undefined) {
    return res.status(400).json({ error: "userId, plan, status, startDate, and endDate are required" });
  }
  if (!["free", "basic", "premium"].includes(plan)) {
    return res.status(400).json({ error: "plan must be one of: free, basic, premium" });
  }
  if (!["active", "expired", "cancelled"].includes(status)) {
    return res.status(400).json({ error: "status must be one of: active, expired, cancelled" });
  }
  if (!getById(userId)) {
    return res.status(400).json({ error: "User not found" });
  }

  const membership = createMembership({ userId, plan, status, startDate, endDate });
  res.status(201).json(membership);
});

// PUT /memberships/:id
app.put("/memberships/:id", (req, res) => {
  const { userId, plan, status, startDate, endDate } = req.body;

  if (plan !== undefined && !["free", "basic", "premium"].includes(plan)) {
    return res.status(400).json({ error: "plan must be one of: free, basic, premium" });
  }
  if (status !== undefined && !["active", "expired", "cancelled"].includes(status)) {
    return res.status(400).json({ error: "status must be one of: active, expired, cancelled" });
  }
  if (userId !== undefined && !getById(userId)) {
    return res.status(400).json({ error: "User not found" });
  }

  const membership = updateMembership(Number(req.params.id), { userId, plan, status, startDate, endDate });
  if (!membership) return res.status(404).json({ error: "Membership not found" });
  res.json(membership);
});

// DELETE /memberships/:id
app.delete("/memberships/:id", (req, res) => {
  const deleted = removeMembership(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Membership not found" });
  res.status(204).send();
});

module.exports = app;
