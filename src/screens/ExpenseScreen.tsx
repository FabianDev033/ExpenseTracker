import React from "react";
import { View, Text, Button } from "react-native";
import { ExpenseList } from "../components/ExpenseList";

const ExpensesScreen = ({ navigation }: any) => {
    return (
        <View className="flex-1 bg-gray-50 px-4 pt-4">
            {/* Botón para navegar al detalle (de la rama de navegación) */}
            <View className="mb-4">
                <Button
                    title="Ver Detalle de Gasto"
                    onPress={() => navigation.navigate("DetalleGasto")}
                />
            </View>

            {/* Listado de gastos (User Story #5) */}
            <ExpenseList />
        </View>
    );
};

export default ExpensesScreen;
