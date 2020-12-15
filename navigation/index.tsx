import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import { AboutScreen } from "../components/screens/About";
import { ImagePickScreen } from "../components/screens/ImagePick";
import { EditScreen } from "../components/screens/Edit";
import { ShareScreen } from "../components/screens/Share";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "本アプリについて" }}
      />
      <Stack.Screen
        name="ImagePick"
        component={ImagePickScreen}
        options={{ title: "画像選択" }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{ title: "編集画面" }}
      />
      <Stack.Screen
        name="Share"
        component={ShareScreen}
        options={{ title: "投稿画面" }}
      />
    </Stack.Navigator>
  );
}
