import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <StatusBar style="dark" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#59c51f",
          tabBarInactiveTintColor: "#94a3b8",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#f1f5f9",
            height: 65 + insets.bottom,
            paddingBottom: 10 + insets.bottom,
            paddingTop: 8,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={21} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recoveries"
          options={{
            title: "Recoveries",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="recycle" size={21} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="credit-card" size={21} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={21} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
