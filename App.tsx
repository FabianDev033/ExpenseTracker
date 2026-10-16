import "./global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ExpensesScreen } from "./src/screens/ExpenseScreem";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ExpensesScreen />
    </SafeAreaProvider>
  );
}
