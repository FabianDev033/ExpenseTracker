import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Pantalla de Inicio
            </Text>

            <Button
                title="Cargar nuevo gasto"
                onPress={() => navigation.navigate('NuevoGasto')}
            />
        </View>
    );
};

export default HomeScreen;