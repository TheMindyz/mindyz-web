import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TrilhasScreen from "../../screens/TrilhasScreen";
import ComunidadeScreen from "../../screens/ComunidadeScreen";
import PsicologosScreen from "../../screens/PsicologosScreen";
import PremiumScreen from "../../screens/PremiumScreen";

// Tipos de rota da Tab
type TabParamList = {
  Trilhas: undefined;
  Comunidade: undefined;
  Psicólogos: undefined;
  Premium: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "#888",
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Trilhas: "leaf",
            Comunidade: "chatbubbles",
            Psicólogos: "people",
            Premium: "sparkles",
          };

          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Trilhas" component={TrilhasScreen} />
      <Tab.Screen name="Comunidade" component={ComunidadeScreen} />
      <Tab.Screen name="Psicólogos" component={PsicologosScreen} />
      <Tab.Screen name="Premium" component={PremiumScreen} />
    </Tab.Navigator>
  );
}
