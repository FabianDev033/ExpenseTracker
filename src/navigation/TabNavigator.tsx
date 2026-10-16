import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/ExpenseScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#64748b',
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeScreen} />
            <Tab.Screen
                name="Gastos"
                component={ExpensesScreen} />
            <Tab.Screen
                name="Configuración"
                component={SettingsScreen} />
        </Tab.Navigator>
    );
}