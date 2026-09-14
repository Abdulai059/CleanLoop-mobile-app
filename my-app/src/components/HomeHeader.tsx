import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  name?: string;
};

export default function HomeHeader({ name = "Susu" }: Props) {
  return (
    <View className="flex-row justify-between items-center mb-5">
      <View>
        <Text className="text-2xl font-bold text-slate-900">
          Hello, {name} 👋
        </Text>
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
