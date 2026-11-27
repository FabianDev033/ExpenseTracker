import React, { useState } from "react";
import {
    Text,
    TextInput,
    View,
} from "react-native";
import {
    type NavigationProp,
    type ParamListBase,
    useNavigation,
} from "@react-navigation/native";

import AppButton from "../components/AppButton";
import { useExpense } from "../features/expenses/ExpenseProvider";

const NewExpenseModal = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { addExpense } = useExpense();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const handleSave = () => {
        const trimmedName = name.trim();
        const trimmedCategory = category.trim();
        const parsedAmount = Number(amount.trim().replace(",", "."));

        if (!trimmedName || !trimmedCategory) {
            setError("Completá el nombre y la categoría del gasto.");
            return;
        }

        if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
            setError("Ingresá un monto mayor a cero.");
            return;
        }

        addExpense({
            id: Date.now().toString(),
            name: trimmedName,
            amount: parsedAmount,
            category: trimmedCategory,
        });

        setName("");
        setAmount("");
        setCategory("");
        setError(null);
        navigation.goBack();
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
                    onChangeText={(value) => {
                        setName(value);
                        setError(null);
                    }}
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
                    onChangeText={(value) => {
                        setAmount(value);
                        setError(null);
                    }}
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
                    onChangeText={(value) => {
                        setCategory(value);
                        setError(null);
                    }}
                    placeholder="Ej. Alimentación"
                    className="rounded-xl border border-gray-300 p-3"
                />
            </View>
            {error ? (
                <Text accessibilityRole="alert" className="text-sm text-red-600">
                    {error}
                </Text>
            ) : null}
            <AppButton title="Guardar" onPress={handleSave} />
        </View>
    );
};

export default NewExpenseModal;
