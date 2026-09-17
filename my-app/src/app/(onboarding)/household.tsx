import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createHousehold } from "@/lib/household";

export default function HouseholdScreen() {
  const router = useRouter();
  const { communityId } = useLocalSearchParams<{ communityId: string }>();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert("Missing info", "Please enter a household name.");
      return;
    }

    if (!communityId) {
      Alert.alert("Error", "Missing community. Please go back and select one.");
      return;
    }

    setSaving(true);
    try {
      await createHousehold({
        name: name.trim(),
        communityId,
      });
      router.replace("/(app)/(tabs)");
    } catch (err: any) {
      console.log(
        "HOUSEHOLD ERROR:",
        JSON.stringify(err?.response?.data, null, 2),
      );
      Alert.alert("Error", "Couldn't save your details. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleSkip() {
    router.replace("/(app)/(tabs)");
  }

  return (
    <View className="flex-1 bg-[#f7f9fc]">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-100"
        >
          <Ionicons name="arrow-back" size={20} color="#0f172a" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-slate-400 font-semibold text-base">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View className="flex-row gap-2 px-6 mb-10">
        <View className="h-1.5 flex-1 rounded-full bg-green-500" />
        <View className="h-1.5 flex-1 rounded-full bg-green-500" />
        <View className="h-1.5 flex-1 rounded-full bg-green-500" />
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        <View className="items-center mb-10">
          <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-5">
            <Ionicons name="home-outline" size={44} color="#16a34a" />
          </View>

          <Text className="text-2xl font-bold text-slate-900 text-center">
            Name your Household
          </Text>
          <Text className="text-sm text-slate-500 text-center mt-2 px-4">
            Give your household a name so members can easily find and join it.
          </Text>
        </View>

        {/* Input */}
        <View>
          <Text className="text-sm font-medium text-slate-600 mb-2 ml-1">
            Household Name
          </Text>
          <TextInput
            placeholder="e.g. Mensah Family"
            placeholderTextColor="#94a3b8"
            value={name}
            onChangeText={setName}
            className="w-full bg-white rounded-2xl px-5 py-4 text-slate-800 border border-slate-100 text-base"
          />
        </View>
      </View>

      {/* Bottom Button */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
          className="w-full bg-[#a9e08b] rounded-2xl py-4 items-center"
        >
          {saving ? (
            <ActivityIndicator color="#0f172a" />
          ) : (
            <Text className="text-slate-900 font-bold text-base">Finish</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
