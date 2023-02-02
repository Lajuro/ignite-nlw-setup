import Fastify, { fastify } from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
import chalk from "chalk";

const PORT = 3333;

// Inicializa o servidor Fastify
const app = Fastify();

// Possibilita o acesso de qualquer origem
app.register(cors);

// Registra as rotas
app.register(appRoutes);

// Inicia o servidor na porta 3333
app.listen(PORT, "192.168.15.11", (err, address) => {
  console.clear();
  console.log(chalk.green.bold.underline(`API Habits - NLW Setup`));
  console.log("\nServer listening at", chalk.cyan(`http://localhost:${PORT}`));
});
