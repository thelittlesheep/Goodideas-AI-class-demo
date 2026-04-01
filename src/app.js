const express = require("express");
const { getAll, getById, create, update, remove } = require("./data");

const app = express();
app.use(express.json());

// GET /users — return all users (no pagination)
app.get("/users", (req, res) => {
  res.json(getAll());
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
