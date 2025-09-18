import db from "../db.js";

export const getUsers = async (request, reply) => {
  const users = db.prepare("SELECT id, name, email FROM users").all();
  return users;
};

export const getUserById = async (request, reply) => {
  const { id } = request.params;
  const user = db.prepare("SELECT id, name, email FROM users WHERE id=?").get(id);
  if (!user) return reply.code(404).send({ error: "Usuário não encontrado" });
  return user;
};

export const createUser = async (request, reply) => {
  const { name, email, password } = request.body;
  try {
    const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    const info = stmt.run(name, email, password);
    return { id: info.lastInsertRowid, name, email };
  } catch (err) {
    return reply.code(400).send({ error: err.message });
  }
};

export const updateUser = async (request, reply) => {
  const { id } = request.params;
  const { name, email, password } = request.body;
  const stmt = db.prepare("UPDATE users SET name=?, email=?, password=? WHERE id=?");
  const info = stmt.run(name, email, password, id);
  if (info.changes === 0) return reply.code(404).send({ error: "Usuário não encontrado" });
  return { message: "Usuário atualizado com sucesso" };
};

export const deleteUser = async (request, reply) => {
  const { id } = request.params;
  const stmt = db.prepare("DELETE FROM users WHERE id=?");
  const info = stmt.run(id);
  if (info.changes === 0) return reply.code(404).send({ error: "Usuário não encontrado" });
  return { message: "Usuário deletado com sucesso" };
};