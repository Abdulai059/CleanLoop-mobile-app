import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#0f172a" : "#ffffff",
          },
          headerTintColor: colorScheme === "dark" ? "#f8fafc" : "#0f172a",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#0f172a" : "#f8fafc",
          },
          headerShadowVisible: false,
        }}
      >
        {/* The Welcome/Splash Screen */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
              flex: 1,
              width: "100%",
              height: "100%",
            },
          }}
        />

        {/* Auth group (login, signup) */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* App group — protected routes */}
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
