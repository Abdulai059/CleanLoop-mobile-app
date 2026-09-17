import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRegions } from "@/hooks/useRegions";
import { useDistricts } from "@/hooks/useDistricts";
import { useCommunities } from "@/hooks/useCommunities";

function PickerList<T extends { id: string; name: string }>({
  items,
  selectedId,
  onSelect,
}: {
  items: T[];
  selectedId?: string;
  onSelect: (item: T) => void;
}) {
  return (
    <View className="gap-2.5">
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
            className={`px-5 py-4 rounded-2xl border flex-row items-center justify-between ${
              isSelected
                ? "bg-green-50 border-green-500"
                : "bg-white border-slate-100"
            }`}
          >
            <Text
              className={`text-base ${
                isSelected ? "text-green-700 font-semibold" : "text-slate-800"
              }`}
            >
              {item.name}
            </Text>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={22} color="#16a34a" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function LocationScreen() {
  const router = useRouter();
  const [step, setStep] = useState<"region" | "district" | "community">(
    "region",
  );
  const [regionId, setRegionId] = useState<string>();
  const [districtId, setDistrictId] = useState<string>();
  const [communityId, setCommunityId] = useState<string>();

  const { data: regions, isLoading: loadingRegions } = useRegions();
  const { data: districts, isLoading: loadingDistricts } =
    useDistricts(regionId);
  const { data: communities, isLoading: loadingCommunities } =
    useCommunities(districtId);

function handleContinue() {
  router.push({
    pathname: "/(onboarding)/household",
    params: { communityId },
  });
}

  function handleSkip() {
    router.replace("/(app)/(tabs)");
  }

  const stepTitle = {
    region: "Select your Region",
    district: "Select your District",
    community: "Select your Community",
  };

  return (
    <View className="flex-1 bg-[#f7f9fc] px-6 pt-14 pb-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-slate-900">
          Where are you located?
        </Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-slate-400 font-semibold text-base">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Steps */}
      <View className="flex-row items-center gap-2 mb-8">
        {["region", "district", "community"].map((s, index) => {
          const isActive =
            (s === "region" && step === "region") ||
            (s === "district" &&
              (step === "district" || step === "community")) ||
            (s === "community" && step === "community");

          const isCompleted =
            (s === "region" && (step === "district" || step === "community")) ||
            (s === "district" && step === "community");

          return (
            <View key={s} className="flex-1 flex-row items-center">
              <View
                className={`h-1.5 flex-1 rounded-full ${
                  isCompleted || isActive ? "bg-green-500" : "bg-slate-200"
                }`}
              />
            </View>
          );
        })}
      </View>

      {/* Step Title + Back */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-base font-semibold text-slate-700">
          {stepTitle[step]}
        </Text>

        {step !== "region" && (
          <TouchableOpacity
            onPress={() =>
              setStep(step === "community" ? "district" : "region")
            }
            className="flex-row items-center gap-1"
          >
            <Ionicons name="arrow-back" size={16} color="#16a34a" />
            <Text className="text-green-600 font-semibold text-sm">Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {step === "region" && (
          <>
            {loadingRegions ? (
              <ActivityIndicator color="#16a34a" className="mt-10" />
            ) : (
              <PickerList
                items={regions ?? []}
                selectedId={regionId}
                onSelect={(item) => {
                  setRegionId(item.id);
                  setDistrictId(undefined);
                  setCommunityId(undefined);
                  setStep("district");
                }}
              />
            )}
          </>
        )}

        {step === "district" && (
          <>
            {loadingDistricts ? (
              <ActivityIndicator color="#16a34a" className="mt-10" />
            ) : (
              <PickerList
                items={districts ?? []}
                selectedId={districtId}
                onSelect={(item) => {
                  setDistrictId(item.id);
                  setCommunityId(undefined);
                  setStep("community");
                }}
              />
            )}
          </>
        )}

        {step === "community" && (
          <>
            {loadingCommunities ? (
              <ActivityIndicator color="#16a34a" className="mt-10" />
            ) : (
              <PickerList
                items={communities ?? []}
                selectedId={communityId}
                onSelect={(item) => setCommunityId(item.id)}
              />
            )}
          </>
        )}
      </ScrollView>

      {/* Continue Button */}
      {step === "community" && communityId && (
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.8}
          className="w-full bg-[#a9e08b] rounded-2xl py-4 items-center mt-3 mb-20"
        >
          <Text className="text-slate-900 font-bold text-base">Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
