import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useMe } from "@/hooks/useMe";

export default function HomeHeader() {
  const { data: user, isLoading } = useMe();

  const displayName = isLoading
    ? "..."
    : user
      ? `${user.firstName}`.trim()
      : "Guest";

  return (
    <View className="flex-row justify-between items-center mb-5">
      <View>
        <View className="flex-row items-center">
          <Text className="text-2xl w-48 font-bold text-slate-900">
            Hello,{" "}
            <Text className="text-2xl font-bold capitalize text-slate-900">
              {displayName}
            </Text>
            <Text className="text-2xl font-bold text-slate-900"> 👋</Text>
          </Text>
        </View>

        <Text className="text-sm text-slate-500 mt-1">
          Let's keep Ghana clean
        </Text>
      </View>

      <TouchableOpacity className="w-11 h-11 rounded-full bg-white border border-slate-200 items-center justify-center">
        <FontAwesome name="bell-o" size={18} color="#334155" />
      </TouchableOpacity>
    </View>
  );
}
