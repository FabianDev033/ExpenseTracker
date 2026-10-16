import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { palette } from "../theme/navigationTheme";
import HomeIcon from "../assets/icons/Home";
import ReceiptIcon from "../assets/icons/Recipt";
import GearIcon from "../assets/icons/Gear";

import { HomeScreen, ExpenseScreen, SettingsScreen } from "../screens";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.black,
        tabBarLabelStyle: {
          fontFamily: "Lato",
          fontSize: 14,
          fontWeight: "normal",
        },
      }}>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gastos"
        component={ExpenseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ReceiptIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GearIcon color={color} width={size} height={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
