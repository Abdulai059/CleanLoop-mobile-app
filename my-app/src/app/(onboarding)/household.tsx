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
import { createHousehold } from "@/lib/household";

export default function HouseholdScreen() {
  const router = useRouter();
  const { regionId, districtId, communityId } = useLocalSearchParams<{
    regionId: string;
    districtId: string;
    communityId: string;
  }>();

  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!address) {
      Alert.alert("Missing info", "Please enter your address.");
      return;
    }
    setSaving(true);
    try {
      await createHousehold({
        regionId,
        districtId,
        communityId,
        address,
      });
      router.replace("/(app)/(tabs)");
    } catch (err) {
      console.error("Failed to create household", err);
      Alert.alert("Error", "Couldn't save your details. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleSkip() {
    router.replace("/(app)/(tabs)");
  }

  return (
    <View className="flex-1 bg-[#f7f9fc] px-8 pt-16 justify-between pb-12">
      <View>
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-2xl font-bold text-slate-900">
            Household Details
          </Text>
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-slate-400 font-semibold">Skip</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Address / Landmark"
          placeholderTextColor="#94a3b8"
          value={address}
          onChangeText={setAddress}
          className="w-full bg-white rounded-xl px-5 py-4 text-slate-800 shadow-sm border border-slate-50 text-base"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        disabled={saving}
        className="w-full bg-[#a9e08b] rounded-xl py-4 items-center"
      >
        {saving ? (
          <ActivityIndicator color="#0f172a" />
        ) : (
          <Text className="text-slate-900 font-bold text-base">Finish</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
