const INITIAL_USERS = [
  { id: 1, name: "Alice Chen", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Wang", email: "bob@example.com", role: "user" },
  { id: 3, name: "Carol Liu", email: "carol@example.com", role: "user" },
  { id: 4, name: "David Lin", email: "david@example.com", role: "moderator" },
  { id: 5, name: "Eve Huang", email: "eve@example.com", role: "user" },
  { id: 6, name: "Frank Wu", email: "frank@example.com", role: "user" },
  { id: 7, name: "Grace Tsai", email: "grace@example.com", role: "admin" },
  { id: 8, name: "Henry Chang", email: "henry@example.com", role: "user" },
  { id: 9, name: "Ivy Yang", email: "ivy@example.com", role: "moderator" },
  { id: 10, name: "Jack Hsu", email: "jack@example.com", role: "user" },
  { id: 11, name: "Karen Li", email: "karen@example.com", role: "user" },
  { id: 12, name: "Leo Chen", email: "leo@example.com", role: "user" },
  { id: 13, name: "Mia Chou", email: "mia@example.com", role: "admin" },
  { id: 14, name: "Nathan Kuo", email: "nathan@example.com", role: "user" },
  { id: 15, name: "Olivia Lai", email: "olivia@example.com", role: "moderator" },
  { id: 16, name: "Peter Su", email: "peter@example.com", role: "user" },
  { id: 17, name: "Quinn Fang", email: "quinn@example.com", role: "user" },
  { id: 18, name: "Rita Yeh", email: "rita@example.com", role: "user" },
];

let users = [...INITIAL_USERS];
let nextId = users.length + 1;

function getAll() {
  return users;
}

function getById(id) {
  return users.find((u) => u.id === id);
}

function create(data) {
  const user = { id: nextId++, ...data };
  users.push(user);
  return user;
}

function update(id, data) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data, id };
  return users[index];
}

function remove(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

function resetData() {
  users = [...INITIAL_USERS];
  nextId = INITIAL_USERS.length + 1;
}

module.exports = { getAll, getById, create, update, remove, resetData };
