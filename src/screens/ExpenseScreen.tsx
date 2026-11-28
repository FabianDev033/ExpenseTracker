import React from "react";
import { View } from "react-native";
import { ExpenseList } from "../components/ExpenseList";
import type { Expense } from "../features/expenses/types";

const ExpensesScreen = ({ navigation }: any) => {
    return (
        <View className="flex-1 bg-gray-50 px-4 pt-4">
            <ExpenseList
                onExpensePress={(expense: Expense) =>
                    navigation.navigate("DetalleGasto", { expenseId: expense.id })
                }
            />
        </View>
    );
};

export default ExpensesScreen;
