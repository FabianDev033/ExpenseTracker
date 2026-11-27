
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { useExpense } from "../features/expenses/ExpenseProvider";
import type { Expense } from "../features/expenses/types";

// 3. Componente para cada gasto
function ExpenseItem({ item }: { item: Expense }) {
    const formattedAmount = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(item.amount);

    return (
        <View className="flex-row justify-between items-center bg-white p-4 mb-3 rounded-2xl border border-gray-100 shadow-sm">
            <View>
                <Text className="text-base font-medium text-gray-800">
                    {item.name}
                </Text>
                <Text className="text-sm text-gray-400">
                    {item.category}
                </Text>
            </View>

            <Text className="text-base font-bold text-rose-500">
                - {formattedAmount}
            </Text>
        </View>
    );
}

// 4. Componente principal que lista los gastos
export function ExpenseList() {
    const { expenses, isLoaded } = useExpense();

    if (!isLoaded) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseItem item={item} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <Text className="text-center text-gray-400 mt-8">
                    No hay gastos registrados
                </Text>
            }
        />
    );
}
