import { View, Text, Image, } from "react-native";
import { Link } from "expo-router";

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      {/* <CornerGlow /> */}

      <Image
        source={require("../../assets/rubaking1.jpg")}
        className="w-[200px] h-[200px] mb-6 object-contain"
      />

      <View className="flex-row items-baseline">
        <Text className="text-5xl font-black tracking-tight text-slate-900">
          Pikup
        </Text>
        <View className="h-2 w-2 rounded-full bg-[#59c51f] ml-0.5" />
      </View>

      <Link href="/login" asChild>
        <Text className="absolute bottom-16 text-slate-900/60 font-semibold  text-sm">
          Continue to Login
        </Text>
      </Link>
    </View>
  );
}


