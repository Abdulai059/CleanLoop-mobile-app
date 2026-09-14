import { ScrollView } from "react-native";
import { useMe } from "@/hooks/useMe";

import HomeHeader from "@/components/HomeHeader";
import PromoBanner from "@/components/PromoBanner";
import SectionHeader from "@/components/SectionHeader";
import MaterialsList from "@/components/MaterialsList";
import RewardsSection from "@/components/RewardsSection";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <PromoBanner />

      <SectionHeader title="Quick Actions" />
      <MaterialsList />

      <SectionHeader title="Available Rewards" />
      <RewardsSection />
    </ScrollView>
  );
}
