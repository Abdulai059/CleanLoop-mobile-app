import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { BackButton } from "@/components/BackButton";
import { signup } from "@/lib/auth";

export default function SignUpScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!phone || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await signup({ phone, password, confirmPassword });
      router.replace("/(app)/(tabs)");
    } catch (err: any) {
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
        {/* Default behavior — just goes back */}
        <BackButton />

        {/* Header Identity Brand Logo */}
        <View className="flex-row items-baseline justify-center mb-10">
          <Text className="text-4xl font-black text-slate-900 tracking-tight">
            Pikup
          </Text>
          <View className="h-1.5 w-1.5 rounded-full bg-[#59c51f] ml-0.5" />
        </View>
        <Text className="text-xl font-bold text-slate-800 mb-6">
          Create your Account
        </Text>
        {/* Input Text Form Fields Container */}
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

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#94a3b8"
            className="w-full bg-white rounded-xl px-5 py-4 text-slate-800 shadow-sm border border-slate-50 text-base mt-4"
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#94a3b8"
            className="w-full bg-white rounded-xl px-5 py-4 text-slate-800 shadow-sm border border-slate-50 text-base mt-4"
          />
        </View>
        {/* Form Submission Sign Up Button */}
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

        {/* Social Vector Grid Connect Layout */}
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
