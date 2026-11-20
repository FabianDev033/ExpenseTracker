import React from "react";
import { View } from "react-native";
import { ExpenseList } from "../components/ExpenseList";

const ExpensesScreen = () => {
  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <ExpenseList />
    </View>
  );
};

export default ExpensesScreen;
