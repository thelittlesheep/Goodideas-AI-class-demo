const INITIAL_MEMBERSHIPS = [
  { id: 1, userId: 1, plan: "premium", status: "active", startDate: "2025-01-01", endDate: "2026-01-01" },
  { id: 2, userId: 2, plan: "basic", status: "active", startDate: "2025-03-15", endDate: "2026-03-15" },
  { id: 3, userId: 3, plan: "free", status: "expired", startDate: "2024-06-01", endDate: "2025-06-01" },
  { id: 4, userId: 5, plan: "premium", status: "cancelled", startDate: "2025-02-01", endDate: "2026-02-01" },
  { id: 5, userId: 7, plan: "basic", status: "active", startDate: "2025-07-01", endDate: "2026-07-01" },
];

let memberships = [...INITIAL_MEMBERSHIPS];
let nextId = memberships.length + 1;

function getAll() {
  return memberships;
}

function getById(id) {
  return memberships.find((m) => m.id === id);
}

function create(data) {
  const membership = { id: nextId++, ...data };
  memberships.push(membership);
  return membership;
}

function update(id, data) {
  const index = memberships.findIndex((m) => m.id === id);
  if (index === -1) return null;
  memberships[index] = { ...memberships[index], ...data, id };
  return memberships[index];
}

function remove(id) {
  const index = memberships.findIndex((m) => m.id === id);
  if (index === -1) return false;
  memberships.splice(index, 1);
  return true;
}

function resetData() {
  memberships = [...INITIAL_MEMBERSHIPS];
  nextId = INITIAL_MEMBERSHIPS.length + 1;
}

module.exports = { getAll, getById, create, update, remove, resetData };
