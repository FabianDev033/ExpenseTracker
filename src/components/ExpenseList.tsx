import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useExpenses, type Expense } from "../context/ExpensesContext";
import { formatAmount, getCategoryMeta } from "../data/categories";

function ExpenseItem({
  item,
  onPress,
}: {
  item: Expense;
  onPress: () => void;
}) {
  const meta = getCategoryMeta(item.category);

  return (
    <Pressable
      onPress={onPress}
      className="flex-row justify-between items-center bg-white p-4 mb-3 rounded-2xl border border-gray-100 shadow-sm active:opacity-80"
    >
      <View className="flex-1 pr-3 gap-1">
        <Text className="text-base font-medium text-gray-800">
          {item.title}
        </Text>
        <View
          className="self-start rounded-full px-2.5 py-0.5"
          style={{ backgroundColor: meta.bgColor }}
        >
          <Text className="text-xs font-medium" style={{ color: meta.color }}>
            {item.category}
          </Text>
        </View>
      </View>

      <Text className="text-base font-bold text-rose-500">
        - {formatAmount(item.amount)}
      </Text>
    </Pressable>
  );
}

export function ExpenseList() {
  const { expenses } = useExpenses();
  const navigation = useNavigation<any>();

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExpenseItem
          item={item}
          onPress={() => navigation.navigate("DetalleGasto", { id: item.id })}
        />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text className="text-center text-gray-400 mt-8">
          Todavía no registraste gastos
        </Text>
      }
    />
  );
}
