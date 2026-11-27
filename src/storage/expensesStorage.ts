import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function StorageTest() {
  useEffect(() => {
    const probar = async () => {
      try {
        const anterior = await AsyncStorage.getItem("@expensetracker/test");
        console.log("Valor guardado antes:", anterior);
        await AsyncStorage.removeItem("@expensetracker/test");
      } catch (error) {
        console.error("No se pudo ejecutar la prueba de AsyncStorage:", error);
      }
    };
    probar();
  }, []);

  return null;
}
