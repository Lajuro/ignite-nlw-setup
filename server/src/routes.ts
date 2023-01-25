import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (req, res) => {
    // Faz a validação dos dados enviados
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    console.log(req.body);

    const { title, weekDays } = createHabitBody.parse(req.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay })),
        },
      },
    });

    // Retorna o código 201 (Created)
    res.status(201);
  });

  app.get("/habits", async () => {
    // Busca todos os hábitos
    const habits = await prisma.habit.findMany();

    return habits;
  });

  app.get("/day", async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(req.query);

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = dayjs(date).get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id);

    return {
      possibleHabits,
      completedHabits,
    };
  });
}
