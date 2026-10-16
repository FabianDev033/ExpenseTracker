
import React from "react";
import { View, Text, FlatList } from "react-native";

// 1. Estructura de un gasto
export interface Expense {
    id: string;
    name: string;
    amount: number;
    category: string;
}

// 2. Datos estaticos de ejemplo
const EXPENSES_DATA: Expense[] = [
    {
        id: "1",
        name: "Supermercado",
        amount: 25000,
        category: "Alimentación",
    },
    {
        id: "2",
        name: "Combustible",
        amount: 18000,
        category: "Transporte",
    },
    {
        id: "3",
        name: "Internet",
        amount: 32000,
        category: "Servicios",
    },
];

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
    return (
        <FlatList
            data={EXPENSES_DATA}
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
