import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { registerForPushNotifications } from "@/lib/notifications";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // Push notifications
  useEffect(() => {
    registerForPushNotifications();

    // When user taps a notification
    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data as {
          redemptionId?: string;
          type?: string;
        };

        if (data?.redemptionId) {
          router.push({
            pathname: "/(app)/rewards/[id]",
            params: { id: data.redemptionId },
          });
        }
      },
    );

    // Optional: when notification arrives while app is open
    const receivedSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      },
    );

    return () => {
      responseSub.remove();
      receivedSub.remove();
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
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

          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </>
  );
}
