import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

import Logo from "../assets/logo.svg";

interface HeaderProps {
  loading?: boolean;
}

export function Header({ loading = false }: HeaderProps) {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />

      <TouchableOpacity
        activeOpacity={0.7}
        className={`flex-row h-11 px-4 border ${
          loading && "opacity-30"
        } border-violet-500 rounded-lg items-center`}
        onPress={() => navigate("new")}
        disabled={loading}
      >
        <Feather name="plus" size={20} color={colors.violet[500]} />
        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  );
}
