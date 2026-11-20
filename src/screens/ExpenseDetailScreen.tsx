import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useExpenses } from "../context/ExpensesContext";
import { formatAmount, getCategoryMeta } from "../data/categories";

const ExpenseDetailScreen = ({ route, navigation }: any) => {
  const { expenses, removeExpense } = useExpenses();
  const id = route?.params?.id;
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="font-lato-bold text-xl text-primary">
          Gasto no encontrado
        </Text>
        <Text className="mt-2 text-center font-lato text-base text-gray-500">
          No encontramos un movimiento con ese identificador.
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Eliminar gasto",
      `¿Querés eliminar "${expense.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            removeExpense(expense.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const meta = getCategoryMeta(expense.category);
  const formattedDate = expense.createdAt
    ? new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(
        new Date(expense.createdAt),
      )
    : "Sin fecha";

  return (
    <View className="flex-1 bg-gray-50 p-6 gap-6">
      <View className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm gap-4">
        <View
          className="self-start rounded-full px-3 py-1"
          style={{ backgroundColor: meta.bgColor }}
        >
          <Text className="text-xs font-bold" style={{ color: meta.color }}>
            {expense.category}
          </Text>
        </View>

        <Text className="font-lato-bold text-2xl text-gray-900">
          {expense.title}
        </Text>

        <Text className="font-lato-bold text-3xl text-rose-500">
          - {formatAmount(expense.amount)}
        </Text>

        <View className="border-t border-gray-100 pt-4 gap-3">
          <View>
            <Text className="text-xs uppercase text-gray-400">Fecha</Text>
            <Text className="text-base text-gray-800">{formattedDate}</Text>
          </View>
          <View>
            <Text className="text-xs uppercase text-gray-400">Notas</Text>
            <Text className="text-base text-gray-800">
              {expense.notes || "Sin notas"}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleDelete}
        className="min-h-12 items-center justify-center rounded-xl bg-rose-600 px-5 py-3 active:opacity-80"
      >
        <Text className="font-lato-bold text-base text-white">
          Eliminar gasto
        </Text>
      </Pressable>
    </View>
  );
};

export default ExpenseDetailScreen;
