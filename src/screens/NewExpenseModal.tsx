import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import AppButton from "../components/AppButton";
import { useExpenses } from "../context/ExpensesContext";
import { CATEGORY_NAMES, getCategoryMeta } from "../data/categories";

const NewExpenseModal = ({ navigation }: any) => {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(CATEGORY_NAMES[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const rawAmount = amount.trim().replace(",", ".");
    const parsedAmount = Number(rawAmount);

    if (
      !trimmedTitle ||
      !/^\d+(?:\.\d{1,2})?$/.test(rawAmount) ||
      !Number.isFinite(parsedAmount) ||
      parsedAmount <= 0 ||
      !CATEGORY_NAMES.includes(category as any)
    ) {
      setError(
        "Completá el nombre, un monto mayor a cero y elegí una categoría.",
      );
      return;
    }

    setError("");
    addExpense({
      title: trimmedTitle,
      amount: parsedAmount,
      category,
      notes: notes.trim(),
    });
    navigation.goBack();
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="gap-4 p-6"
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-xl font-bold text-primary">Nuevo gasto</Text>

      <View className="gap-2">
        <Text className="text-base font-medium text-gray-800">
          Nombre del gasto
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ej. Supermercado"
          maxLength={100}
          className="rounded-xl border border-gray-300 p-3"
        />
      </View>

      <View className="gap-2">
        <Text className="text-base font-medium text-gray-800">Monto</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Ej. 25000"
          keyboardType="decimal-pad"
          maxLength={15}
          className="rounded-xl border border-gray-300 p-3"
        />
      </View>

      <View className="gap-2">
        <Text className="text-base font-medium text-gray-800">Categoría</Text>
        <View className="flex-row flex-wrap gap-2">
          {CATEGORY_NAMES.map((item) => {
            const selected = category === item;
            const meta = getCategoryMeta(item);
            return (
              <Pressable
                key={item}
                onPress={() => setCategory(item)}
                className="rounded-full border px-3.5 py-2"
                style={{
                  backgroundColor: selected ? meta.bgColor : "#FFFFFF",
                  borderColor: selected ? meta.color : "#CBD5E1",
                }}
              >
                <Text
                  className="text-sm font-medium"
                  style={{ color: selected ? meta.color : "#334155" }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-base font-medium text-gray-800">
          Notas (opcional)
        </Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Ej. Compra semanal"
          maxLength={200}
          className="rounded-xl border border-gray-300 p-3"
        />
      </View>

      {error ? (
        <Text className="text-sm font-medium text-rose-600">{error}</Text>
      ) : null}

      <View className="pt-2">
        <AppButton title="Guardar" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export default NewExpenseModal;
