import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';

import { useExpense } from '../features/expenses/ExpenseProvider';

type ExpenseDetailScreenProps = {
  route: { params?: { expenseId?: string } };
  navigation: { goBack: () => void };
};

export default function ExpenseDetailScreen({
  route,
  navigation,
}: ExpenseDetailScreenProps) {
  const { expenses, deleteExpense } = useExpense();
  const [isDeleting, setIsDeleting] = useState(false);
  const expense = expenses.find((item) => item.id === route.params?.expenseId);

  const confirmDelete = () => {
    if (!expense || isDeleting) return;

    Alert.alert(
      'Eliminar gasto',
      `¿Querés eliminar “${expense.name}”? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            void (async () => {
              setIsDeleting(true);
              try {
                await deleteExpense(expense.id);
                navigation.goBack();
              } catch {
                setIsDeleting(false);
                Alert.alert('No se pudo eliminar', 'Revisá tu conexión e intentá nuevamente.');
              }
            })();
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (!expense) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Text className="mb-2 text-center font-lato-bold text-xl text-slate-900">
          Gasto no disponible
        </Text>
        <Text className="mb-6 text-center font-lato text-base text-slate-500">
          Puede que se haya eliminado desde otro dispositivo.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={navigation.goBack}
          className="min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3"
        >
          <Text className="font-lato-bold text-base text-white">Volver a gastos</Text>
        </Pressable>
      </View>
    );
  }

  const formattedAmount = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(expense.amount);

  return (
    <View className="flex-1 bg-gray-50 px-5 pt-6">
      <View className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <Text className="mb-2 font-lato text-sm text-slate-500">Descripción</Text>
        <Text className="mb-5 font-lato-bold text-2xl text-slate-900">{expense.name}</Text>

        <Text className="mb-2 font-lato text-sm text-slate-500">Categoría</Text>
        <Text className="mb-5 font-lato-bold text-base text-slate-900">{expense.category}</Text>

        <Text className="mb-2 font-lato text-sm text-slate-500">Importe</Text>
        <Text className="font-lato-bold text-2xl text-rose-600">{formattedAmount}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isDeleting }}
        disabled={isDeleting}
        onPress={confirmDelete}
        className="mt-6 min-h-12 flex-row items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 active:opacity-80"
      >
        {isDeleting ? <ActivityIndicator color="#DC2626" /> : null}
        <Text className="ml-2 font-lato-bold text-base text-red-600">
          {isDeleting ? 'Eliminando…' : 'Eliminar gasto'}
        </Text>
      </Pressable>
    </View>
  );
}
