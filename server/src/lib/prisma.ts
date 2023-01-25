import { PrismaClient } from "@prisma/client";

// Inicializa o cliente do Prisma
export const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});
