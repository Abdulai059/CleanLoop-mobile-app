import HomeHeader from "@/components/HomeHeader";
import MaterialsList from "@/components/MaterialsList";
import PromoBanner from "@/components/PromoBanner";
import RewardsSection from "@/components/RewardsSection";
import SectionHeader from "@/components/SectionHeader";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader name="Susu" />
      <PromoBanner />

      <SectionHeader title="Quick Actions" />
      <MaterialsList />

      <SectionHeader title="Available Rewards" />
      <RewardsSection />
    </ScrollView>
  );
}
