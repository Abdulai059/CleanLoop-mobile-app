import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center px-5 pt-2 pb-4">
      <TouchableOpacity onPress={() => router.back()} className="mr-4">
        <Ionicons name="arrow-back" size={24} color="#0f172a" />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-slate-900">Profile</Text>
    </View>
  );
}
