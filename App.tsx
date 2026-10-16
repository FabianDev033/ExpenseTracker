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
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import RootStack from "./src/navigation/RootStack";

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
