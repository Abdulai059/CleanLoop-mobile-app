import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// 1. Import your tailwind directives from your src directory
import "../global.css";

// Prevent the splash screen from auto-hiding before assets load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide the splash screen once the app mounting logic completes
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      {/* Dynamic status bar reflecting your device theme status */}
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
      />

      {/* Global Application Router Navigation Structure */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#0f172a" : "#ffffff", // slate-900 or white
          },
          headerTintColor: colorScheme === "dark" ? "#f8fafc" : "#0f172a", // slate-50 or slate-900
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#0f172a" : "#f8fafc", // Background system canvas
          },
          headerShadowVisible: false, // Clean borderless layout look
        }}
      >
        {/* The Welcome/Splash Screen - Overriding configuration for full viewport stretch */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            // 👇 Added layout parameter metrics to fix the centering constraints globally
            contentStyle: {
              backgroundColor: "transparent",
              flex: 1,
              width: "100%",
              height: "100%",
            },
          }}
        />

        {/* The Login Screen - Custom Header Hidden */}
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        {/* The Signup Screen - Custom Header Hidden */}
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
