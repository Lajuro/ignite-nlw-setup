import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

// Inicializa o servidor Fastify
const app = Fastify();

// Possibilita o acesso de qualquer origem
app.register(cors);

// Registra as rotas
app.register(appRoutes);

// Inicia o servidor na porta 3333
app.listen({ port: 3333 }, (err, address) => {
  console.log(`HTTP Server running`);
});
