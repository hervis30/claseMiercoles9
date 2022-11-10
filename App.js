import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./assets/component/Home";

const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="home"
          component={Home}
          options={{ title: "Vendedor y ventas" }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
