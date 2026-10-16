import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseList } from "../components/ExpenseList";

export function ExpensesScreen() {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-1 px-4 pt-4">

                {/* Encabezado de la pantalla */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-gray-900">
                        Control de Gastos
                    </Text>
                    <Text className="text-sm text-gray-500">
                        Historial de movimientos
                    </Text>
                </View>

                {/* Listado de gastos (User Story #5) */}
                <ExpenseList />

            </View>
        </SafeAreaView>
    );
}
