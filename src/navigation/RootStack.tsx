import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import NewExpenseModal from "../screens/NewExpenseModal";
import ExpenseDetailScreen from "../screens/ExpenseDetailScreen";
import { palette } from "../theme/navigationTheme";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: palette.primary },
        headerTintColor: palette.white,
        headerTitleStyle: { fontFamily: "Lato_700Bold", fontWeight: "normal" },
      }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetalleGasto"
        component={ExpenseDetailScreen}
        options={{ title: "Detalle de Transacción" }}
      />

      <Stack.Screen
        name="NuevoGasto"
        component={NewExpenseModal}
        options={{
          presentation: "modal",
          title: "Registrar Nuevo Gasto",
        }}
      />
    </Stack.Navigator>
  );
}
