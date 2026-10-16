import React from "react";
import { View, Text, FlatList } from "react-native";

// 1. Definimos la estructura de un Gasto usando TypeScript
export interface Expense {
    id: string;
    description: string;
    amount: number;
}

// 2. Datos estáticos que pide la consigna de la US #5
const EXPENSES_DATA: Expense[] = [
    { id: "1", description: "Supermercado", amount: 25000 },
    { id: "2", description: "Combustible", amount: 18000 },
    { id: "3", description: "Internet", amount: 32000 },
];

// 3. Sub-componente para cada elemento individual (fila)
function ExpenseItem({ item }: { item: Expense }) {
    // Formateamos el número a moneda local (ARS: $ 25.000)
    const formattedAmount = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(item.amount);
    return (
        <View className="flex-row justify-between items-center bg-white p-4 mb-3 rounded-2xl border border-gray-100 shadow-sm">
            <Text className="text-base font-medium text-gray-800">
                {item.description}
            </Text>
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