import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

export async function userRoutes(fastify, options) {
  fastify.get("/", getUsers);
  fastify.get("/:id", getUserById);
  fastify.post("/", createUser);
  fastify.put("/:id", updateUser);
  fastify.delete("/:id", deleteUser);
}
