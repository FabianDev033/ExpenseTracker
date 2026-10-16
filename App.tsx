import "./global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import RootStack from "./src/navigation/RootStack";
import { navigationTheme } from "./src/theme/navigationTheme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Lato_400Regular, Lato_700Bold });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack />
    </NavigationContainer>
  );
}
