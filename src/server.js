import fastify from "fastify";
import { userRoutes } from "./routes/users.routes.js";
const server = fastify({ logger: true });
const PORT = 3000;

server.register (userRoutes,{ prefix: '/users'})

const start = async () => {
  try {
    await server.listen({ port: PORT });
    console.log(`Server listening at http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
