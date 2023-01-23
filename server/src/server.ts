import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

// Inicializa o servidor Fastify
const app = Fastify();

// Inicializa o cliente do Prisma
const prisma = new PrismaClient();

// Possibilita o acesso de qualquer origem
app.register(cors);

app.get("/habits", async () => {
  // Busca todos os hábitos
  const habits = await prisma.habit.findMany();

  return habits;
});

// Inicia o servidor na porta 3333
app.listen({ port: 3333 }, (err, address) => {
  console.log(`HTTP Server running`);
});
