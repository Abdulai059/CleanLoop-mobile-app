import { View, Text, TouchableOpacity, Image } from "react-native";

export default function PromoBanner() {
  return (
    <>
      <View className="bg-green-100 rounded-3xl p-5 flex-row mb-3 overflow-hidden">
        <View className="flex-1 justify-center">
          <Text className="text-sm font-semibold text-green-800">
            Earn more points
          </Text>
          <Text className="text-xs text-green-500 mt-0.5">This week only</Text>
          <Text className="text-3xl font-extrabold text-green-800 my-1.5">
            2× Points
          </Text>

          <TouchableOpacity className="bg-white px-4 py-2 rounded-full self-start mt-1.5">
            <Text className="text-sm font-semibold text-green-800">
              Start Recycling
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-24 items-center justify-center">
          <Image
            source={require("../../assets/materials/recycle.gif")}
            className="w-28 h-28"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Dots */}
      <View className="flex-row justify-center gap-1.5 mb-7">
        <View className="w-4 h-1.5 rounded-full bg-green-500" />
        <View className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <View className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      </View>
    </>
  );
}
