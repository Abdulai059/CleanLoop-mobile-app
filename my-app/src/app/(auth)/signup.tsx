import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { BackButton } from "@/components/BackButton";
import { signup } from "@/lib/auth";

export default function SignUpScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSignup() {
    // ...validation...
    setLoading(true);
    try {
      await signup({ phone, password, confirmPassword });
      router.replace("/(onboarding)/location");
    } catch (err: any) {
      console.log(
        "SIGNUP ERROR:",
        JSON.stringify(err?.response?.data, null, 2),
      );
      console.log("STATUS:", err?.response?.status);
      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";
      Alert.alert("Signup failed", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-[#f7f9fc] px-8 pt-12 justify-between pb-12">
      <View>
        <BackButton />

        <View className="flex-row items-baseline justify-center mb-10">
          <Text className="text-4xl font-black text-slate-900 tracking-tight">
            Pikup
          </Text>
          <View className="h-1.5 w-1.5 rounded-full bg-[#59c51f] ml-0.5" />
        </View>
        <Text className="text-xl font-bold text-slate-800 mb-6">
          Create your Account
        </Text>

        <View className="space-y-4">
          {/* Phone Number Field with country code prefix */}
          <View className="flex-row items-center w-full bg-white rounded-xl px-5 py-2 shadow-sm border border-slate-50">
            <Text className="text-slate-800 text-base font-semibold mr-2">
              🇬🇭 +233
            </Text>
            <View className="w-px h-5 bg-slate-200 mr-3" />
            <TextInput
              placeholder="Phone number"
              placeholderTextColor="#94a3b8"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              className="flex-1 text-slate-800 text-base"
            />
          </View>

          {/* Password Field with eye toggle */}
          <View className="flex-row items-center w-full bg-white rounded-xl px-5 py-2 shadow-sm border border-slate-50 mt-4">
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#94a3b8"
              className="flex-1 text-slate-800 text-base"
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Field with eye toggle */}
          <View className="flex-row items-center w-full bg-white rounded-xl px-5 py-2 shadow-sm border border-slate-50 mt-4">
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#94a3b8"
              className="flex-1 text-slate-800 text-base"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Pressable
          onPress={handleSignup}
          disabled={loading}
          className="w-full bg-[#fec43a] rounded-xl py-4 mt-8 items-center active:opacity-90 shadow-md shadow-blue-200"
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-bold text-base">Sign up</Text>
          )}
        </Pressable>

        <Text className="text-center text-xs font-semibold text-slate-400 mt-10 mb-6">
          - Or sign up with -
        </Text>
        <SocialAuthButtons
          onGooglePress={() => console.log("Google login")}
          onApplePress={() => console.log("Apple login")}
          onFacebookPress={() => console.log("Facebook login")}
        />
      </View>
    </View>
  );
}
