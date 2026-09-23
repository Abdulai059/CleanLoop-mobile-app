import { useState } from "react";
import { Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { logout } from "@/lib/auth";

export default function ProfileScreen() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (err) {
      console.error("Logout failed", err);
      Alert.alert(
        "Error",
        "Something went wrong logging out. Please try again.",
      );
    } finally {
      setLoggingOut(false);
    }
  }

  function confirmLogout() {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: handleLogout },
    ]);
  }

  // ...rest of your ProfileScreen unchanged...

  return (
    // ...
    <TouchableOpacity
      onPress={confirmLogout}
      disabled={loggingOut}
      className="mt-6 bg-red-50 rounded-2xl py-4 flex-row items-center justify-center gap-2"
    >
      {loggingOut ? (
        <ActivityIndicator color="#ef4444" size="small" />
      ) : (
        <>
          <Feather name="log-out" size={18} color="#ef4444" />
          <Text className="text-red-500 font-semibold text-base">Logout</Text>
        </>
      )}
    </TouchableOpacity>
    // ...
  );
}
