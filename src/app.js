const express = require("express");
const { getAll, getById, create, update, remove } = require("./data");

const app = express();
app.use(express.json());

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

module.exports = app;
