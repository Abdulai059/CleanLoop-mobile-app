import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
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
    <View className="gap-2">
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onSelect(item)}
          className={`px-5 py-4 rounded-xl border ${
            selectedId === item.id
              ? "bg-green-50 border-green-500"
              : "bg-white border-slate-100"
          }`}
        >
          <Text
            className={`text-base ${
              selectedId === item.id
                ? "text-green-700 font-semibold"
                : "text-slate-800"
            }`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
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
      params: { regionId, districtId, communityId },
    });
  }

  function handleSkip() {
    router.replace("/(app)/(tabs)");
  }

  return (
    <View className="flex-1 bg-[#f7f9fc] px-8 pt-16">
      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-2xl font-bold text-slate-900">
          Where are you located?
        </Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-slate-400 font-semibold">Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {step === "region" && (
          <>
            <Text className="text-sm font-semibold text-slate-500 mb-3">
              Region
            </Text>
            {loadingRegions ? (
              <ActivityIndicator color="#16a34a" />
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
            <TouchableOpacity
              onPress={() => setStep("region")}
              className="mb-3"
            >
              <Text className="text-green-600 font-semibold">
                ← Change region
              </Text>
            </TouchableOpacity>
            <Text className="text-sm font-semibold text-slate-500 mb-3">
              District
            </Text>
            {loadingDistricts ? (
              <ActivityIndicator color="#16a34a" />
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
            <TouchableOpacity
              onPress={() => setStep("district")}
              className="mb-3"
            >
              <Text className="text-green-600 font-semibold">
                ← Change district
              </Text>
            </TouchableOpacity>
            <Text className="text-sm font-semibold text-slate-500 mb-3">
              Community
            </Text>
            {loadingCommunities ? (
              <ActivityIndicator color="#16a34a" />
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

      {step === "community" && communityId && (
        <TouchableOpacity
          onPress={handleContinue}
          className="w-full bg-[#a9e08b] rounded-xl py-4 mt-4 items-center"
        >
          <Text className="text-slate-900 font-bold text-base">Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
