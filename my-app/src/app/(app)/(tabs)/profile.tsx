// ProfileScreen.tsx
import { ScrollView, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMe } from "@/hooks/useMe";
import { profileMenu } from "@/components/profile/menuData";

import ProfileHeader from "@/components/profile/ProfileHeader";
import UserInfo from "@/components/profile/UserInfo";
import BalanceCard from "@/components/profile/BalanceCard";
import MenuSection from "@/components/profile/MenuSection";
import LogoutButton from "@/components/profile/LogoutButton";

export default function ProfileScreen() {
  const { data: user, isLoading, error } = useMe();

  if (isLoading) {
    return (
      <SafeAreaView
        className="flex-1 bg-white items-center justify-center"
        edges={["top"]}
      >
        <ActivityIndicator color="#16a34a" />
      </SafeAreaView>
    );
  }

  if (error || !user) {
    return (
      <SafeAreaView
        className="flex-1 bg-white items-center justify-center px-8"
        edges={["top"]}
      >
        <Text className="text-slate-500 text-center">
          Couldn't load your profile.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader />
      <UserInfo user={user} />
      <BalanceCard balance="0.00" />

      <View className="px-5">
        {profileMenu.map((section) => (
          <MenuSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}

        <LogoutButton />
      </View>
    </ScrollView>
  );
}
