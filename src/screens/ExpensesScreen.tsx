import React from 'react';
import { View, Text } from 'react-native';
import AppButton from '../components/AppButton';

const ExpensesScreen = ({ navigation }: any) => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="font-lato-bold text-xl text-primary">
                Pantalla de gastos
            </Text>

            <AppButton
                title="Ver Detalle de Gasto"
                onPress={() => navigation.navigate('DetalleGasto')}
            />
        </View>
    );
};

export default ExpensesScreen;
