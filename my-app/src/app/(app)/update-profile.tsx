import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMe } from "@/hooks/useMe";
import { useUpdateMe } from "@/hooks/useUpdateMe";

export default function EditProfileScreen() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();
  const { mutateAsync: saveProfile, isPending: saving } = useUpdateMe();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  async function handleSave() {
    try {
      await saveProfile({ firstName, lastName, email: email || undefined });
      Alert.alert("Saved", "Your profile has been updated.");
      router.back();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Couldn't save your profile.";
      Alert.alert("Error", message);
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView
        className="flex-1 items-center justify-center bg-white"
        edges={["top"]}
      >
        <ActivityIndicator color="#16a34a" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center px-5 pt-4 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Edit Profile</Text>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <Text className="text-sm font-semibold text-slate-500 mb-2 mt-4">
          First Name
        </Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
          placeholderTextColor="#94a3b8"
          className="w-full bg-slate-50 rounded-xl px-5 py-4 text-slate-800 border border-slate-100 text-base"
        />

        <Text className="text-sm font-semibold text-slate-500 mb-2 mt-4">
          Last Name
        </Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          placeholderTextColor="#94a3b8"
          className="w-full bg-slate-50 rounded-xl px-5 py-4 text-slate-800 border border-slate-100 text-base"
        />

        <Text className="text-sm font-semibold text-slate-500 mb-2 mt-4">
          Email
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          keyboardType="email-address"
          className="w-full bg-slate-50 rounded-xl px-5 py-4 text-slate-800 border border-slate-100 text-base"
        />

        <Text className="text-sm font-semibold text-slate-500 mb-2 mt-4">
          Phone
        </Text>
        <View className="w-full bg-slate-100 rounded-xl px-5 py-4">
          <Text className="text-slate-400 text-base">{user?.phone}</Text>
        </View>
        <Text className="text-xs text-red-400 mt-1 mb-6">
          Phone number can't be changed here.
        </Text>
      </ScrollView>

      <View className="px-5 pb-8">
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          className="w-full bg-[#59c51f] rounded-xl py-4 items-center"
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-bold text-base">Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
