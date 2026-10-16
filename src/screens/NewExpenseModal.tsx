
import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import AppButton from "../components/AppButton";

const NewExpenseModal = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const handleSave = () => {
        Alert.alert(
            "Nuevo gasto",
            `Nombre: ${name}\nMonto: ${amount}\nCategoría: ${category}`
        );
    };

    return (
        <View className="flex-1 gap-4 bg-white p-6">
            <Text className="text-xl font-bold text-primary">
                Nuevo gasto
            </Text>
            <View className="gap-2">
                <Text className="text-base font-medium text-gray-800">
                    Nombre del gasto
                </Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Ej. Supermercado"
                    className="rounded-xl border border-gray-300 p-3"
                />
            </View>
            <View className="gap-2">
                <Text className="text-base font-medium text-gray-800">
                    Monto
                </Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Ej. 25000"
                    keyboardType="numeric"
                    className="rounded-xl border border-gray-300 p-3"
                />
            </View>
            <View className="gap-2">
                <Text className="text-base font-medium text-gray-800">
                    Categoría
                </Text>
                <TextInput
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Ej. Alimentación"
                    className="rounded-xl border border-gray-300 p-3"
                />
            </View>
            <AppButton
                title="Guardar"
                onPress={handleSave}
            />
        </View>
    );
};

export default NewExpenseModal;
