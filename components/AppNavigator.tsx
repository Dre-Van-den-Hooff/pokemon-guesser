import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StartupScreen from "./StartupScreen";
import Game from "./Game";
import ScoreScreen from "./ScoreScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Startup">
        <Screen name="Startup" component={StartupScreen} options={{ headerShown: false }} />
        <Screen name="Game" component={Game} options={{ headerShown: false }} />
        <Screen name="Score" component={ScoreScreen} options={{ headerShown: false }} />
      </Navigator>
    </NavigationContainer>
  );
}
