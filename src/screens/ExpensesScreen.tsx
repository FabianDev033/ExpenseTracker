import React from 'react';
import { View, Text, Button } from 'react-native';

const ExpensesScreen = ({ navigation }: any) => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Pantalla de gastos
            </Text>

            <Button
                title="Ver Detalle de Gasto"
                onPress={() => navigation.navigate('DetalleGasto')}
            />
        </View>
    );
};

export default ExpensesScreen;