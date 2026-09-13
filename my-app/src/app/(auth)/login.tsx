import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { login } from "@/lib/auth";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!phone || !password) {
      Alert.alert("Missing fields", "Please enter your phone and password.");
      return;
    }
    setLoading(true);
    try {
      await login({ phone, password });
      router.replace("/(app)/(tabs)");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Invalid phone number or password.";
      Alert.alert("Login failed", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-[#f7f9fc] px-8 pt-16 justify-between pb-12">
      <View>
        {/* Top Header Identity Brand Logo */}
        <View className="flex-row items-baseline justify-center mb-12">
          <Text className="text-4xl font-black text-slate-900 tracking-tight">
            Pikup
          </Text>
          <View className="h-1.5 w-1.5 rounded-full bg-[#59c51f] ml-0.5" />
        </View>

        <Text className="text-xl font-bold text-slate-800 mb-6">
          Login to your Account
        </Text>

        {/* Input Text Form Fields */}
        <View className="space-y-4">
          {/* Phone Number Field with country code prefix */}
          <View className="flex-row items-center w-full bg-white rounded-xl px-5 py-1 shadow-md shadow-slate-100 border border-slate-50">
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

          <View className="flex-row items-center w-full bg-white rounded-xl px-5 py-2 shadow-sm shadow-slate-100 border border-slate-50 mt-4">
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#94a3b8"
              className="flex-1 text-slate-800 text-base"
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Text className="text-slate-400">
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Sign In Submission Interactive Action Button */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          className="w-full rounded-xl mt-8 overflow-hidden active:opacity-90 shadow-md shadow-blue-200"
        >
          <LinearGradient
            colors={[
              "rgba(169, 224, 139, 0.9)",
              "rgba(169, 224, 139, 0.5)",
              "rgba(169, 224, 139, 0.15)",
              "rgba(255,255,255,0)",
            ]}
            locations={[0, 0.35, 0.65, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View className="py-4 items-center">
            {loading ? (
              <ActivityIndicator color="#0f172a" />
            ) : (
              <Text className="text-slate-900 font-bold text-base">
                Sign In
              </Text>
            )}
          </View>
        </Pressable>
        {/* Alternative Authentication Pathways */}
        <Text className="text-center text-xs font-semibold text-slate-400 mt-12 mb-6">
          - Or sign in with -
        </Text>

        {/* Social Vector Grid Elements */}
        <SocialAuthButtons
          onGooglePress={() => console.log("Google login")}
          onApplePress={() => console.log("Apple login")}
          onFacebookPress={() => console.log("Facebook login")}
        />
      </View>

      {/* Sticky Bottom Interactive Redirection Platform Footer */}
      <View className="flex-row justify-center space-x-1 bottom-16 text-slate-900/60 font-semibold">
        <Text className="text-slate-400 text-sm font-medium">
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text className="text-[#1d35a6] font-bold text-sm">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
