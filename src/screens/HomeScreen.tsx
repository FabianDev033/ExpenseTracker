import React from "react";
import { ScrollView, View, Text } from "react-native";
import AppButton from "../components/AppButton";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 items-center justify-center gap-10 bg-white">
      <View className="min-h-48 items-center justify-center gap-4 my-auto">
        <Text className="text-center font-lato text-[2.5rem] text-primary">
          Bienvenido a Expense Tracker
        </Text>
        <Text className="text-center font-lato text-lg text-black/80">
          Llevá un registro de tus gastos personales de forma simple y
          organizada.
        </Text>
        <Text className="text-center font-lato text-lg text-black/80">
          Controlá tus finanzas y descubrí en qué gastás tu dinero.
        </Text>
      </View>

      <View className="min-h-32 items-center pt-10 my-auto">
        <AppButton
          title="Cargar nuevo gasto"
          onPress={() => navigation.navigate("NuevoGasto")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
