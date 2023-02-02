import { useEffect, useState } from "react";

import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);

  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de dados");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header loading={loading} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <View className="flex-row mt-6 mb-2">
            {weekDays.map((weekDay, key) => (
              <Text
                key={`${weekDay}-${key}`}
                className="text-zinc-400 text-xl font-bold text-center mx-1"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              >
                {weekDay}
              </Text>
            ))}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {summary && (
              <View className="flex-row flex-wrap">
                {datesFromYearStart.map((date, key) => {
                  const dayWithHabits = summary.find((day) => {
                    return dayjs(date).isSame(dayjs(day.date), "day");
                  });

                  return (
                    <HabitDay
                      key={key}
                      amount={dayWithHabits?.amount}
                      completed={dayWithHabits?.completed}
                      date={date}
                      onPress={() =>
                        navigate("habit", { date: date.toISOString() })
                      }
                    />
                  );
                })}
                {amountOfDaysToFill > 0 &&
                  Array.from({ length: amountOfDaysToFill }).map((_, key) => (
                    <View
                      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                      style={{ width: DAY_SIZE, height: DAY_SIZE }}
                      key={key}
                    />
                  ))}
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}
