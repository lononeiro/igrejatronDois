import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen/homeScreen";
import PaginaTeste from "../screens/paginaTeste/paginaTeste";

export type RootStackParamList = {
  Home: undefined;
  "Pagina teste": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Início" }}
        />
        <Stack.Screen 
          name="Pagina teste"
          component={PaginaTeste}
          options={{ title: "Pagina teste" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
