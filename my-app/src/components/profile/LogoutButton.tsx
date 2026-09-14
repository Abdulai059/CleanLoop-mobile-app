import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  onPress?: () => void;
};

export default function LogoutButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-6 bg-red-50 rounded-2xl py-4 flex-row items-center justify-center gap-2"
    >
      <Feather name="log-out" size={18} color="#ef4444" />
      <Text className="text-red-500 font-semibold text-base">Logout</Text>
    </TouchableOpacity>
  );
}
