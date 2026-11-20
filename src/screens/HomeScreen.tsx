import React from "react";
import { View, Text } from "react-native";
import AppButton from "../components/AppButton";
import { useExpenses } from "../context/ExpensesContext";
import { formatAmount } from "../data/categories";

const HomeScreen = ({ navigation }: any) => {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-white px-6">
      <View className="items-center justify-center gap-3">
        <Text className="text-center font-lato text-[2.2rem] text-primary">
          Bienvenido a Expense Tracker
        </Text>
        <Text className="text-center font-lato text-base text-black/80">
          Llevá un registro de tus gastos personales de forma simple y
          organizada.
        </Text>
        <Text className="text-center font-lato text-base text-black/80">
          Controlá tus finanzas y descubrí en qué gastás tu dinero.
        </Text>
      </View>

      <View className="w-full items-center rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <Text className="font-lato text-sm text-gray-500">
          Tus gastos registrados
        </Text>
        <Text className="mt-1 font-lato-bold text-3xl text-primary">
          {formatAmount(total)}
        </Text>
        <Text className="mt-1 font-lato text-sm text-gray-500">
          {expenses.length} {expenses.length === 1 ? "movimiento" : "movimientos"}
        </Text>
      </View>

      <View className="items-center pt-2">
        <AppButton
          title="Cargar nuevo gasto"
          onPress={() => navigation.navigate("NuevoGasto")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
