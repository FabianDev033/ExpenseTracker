import "./global.css";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import RootStack from "./src/navigation/RootStack";

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
