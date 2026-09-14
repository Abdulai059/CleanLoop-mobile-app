import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { getMe, type User } from "@/lib/user";

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
};

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4"
    >
      <View className="flex-row items-center gap-3">
        {icon}
        <Text className="text-base text-slate-800">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
    </TouchableOpacity>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text className="text-sm text-slate-400 font-medium mt-5 mb-1">
      {title}
    </Text>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch((err) => {
        console.error("Failed to fetch user", err);
        setError("Couldn't load your profile.");
      })
      .finally(() => setLoading(false));
  }, []);

  // 👇 Guard against null user before rendering anything that reads user.*
  if (loading) {
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
          {error ?? "No profile data available."}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center px-5 pt-2 pb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-900">Profile</Text>
        </View>

        {/* User Info */}
        <TouchableOpacity className="flex-row items-center justify-between px-5 mb-5">
          <View className="flex-row items-center gap-3">
            <View className="w-14 h-14 rounded-full bg-green-100 items-center justify-center">
              <FontAwesome name="user" size={28} color="#16a34a" />
            </View>
            <View>
              <Text className="text-lg font-bold uppercase text-slate-900">
                {user.firstName} {user.lastName}
              </Text>

              {/* <Text className="text-sm text-slate-400">See Profile</Text> */}

              <View className="mt-1 flex flex-row">
                <Text className="text-sm text-slate-400 mb-1">Role</Text>
                <Text className="text-slate-900 text-xs font-semibold ml-2">
                  {user.roles.join(", ")}
                </Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </TouchableOpacity>

        {/* Balance Card */}
        <View className="mx-5 mb-2 bg-green-600 rounded-2xl p-5 overflow-hidden">
          <Text className="text-2xl font-bold text-white">0.00 PTS</Text>
          <Text className="text-sm text-green-100 mt-1">Current Balance</Text>

          <View className="absolute right-4 top-3 opacity-20">
            <View className="w-20 h-20 rounded-full border-2 border-white" />
          </View>
          <View className="absolute right-10 bottom-2 opacity-10">
            <View className="w-16 h-16 rounded-full border-2 border-white" />
          </View>
        </View>

        {/* Menu Sections */}
        <View className="px-5">
          <SectionTitle title="Account" />
          <MenuItem
            icon={<Feather name="package" size={20} color="#64748b" />}
            title="My Recoveries"
          />
          <MenuItem
            icon={<Feather name="lock" size={20} color="#64748b" />}
            title="Change Password"
          />
          <MenuItem
            icon={<Feather name="user-plus" size={20} color="#64748b" />}
            title="Invite Friends"
          />
          <MenuItem
            icon={<Feather name="globe" size={20} color="#64748b" />}
            title="Language"
          />

          <SectionTitle title="Wallet" />
          <MenuItem
            icon={<Feather name="credit-card" size={20} color="#64748b" />}
            title="My Wallet"
          />
          <MenuItem
            icon={
              <MaterialIcons name="card-giftcard" size={20} color="#64748b" />
            }
            title="Rewards"
          />
          <MenuItem
            icon={<Feather name="clock" size={20} color="#64748b" />}
            title="Transaction History"
          />

          <SectionTitle title="Support" />
          <MenuItem
            icon={<Feather name="file-text" size={20} color="#64748b" />}
            title="Terms And Conditions"
          />
          <MenuItem
            icon={<Feather name="shield" size={20} color="#64748b" />}
            title="Privacy Policy"
          />
          <MenuItem
            icon={<Feather name="message-circle" size={20} color="#64748b" />}
            title="Contact Us"
          />

          <TouchableOpacity className="mt-6 bg-red-50 rounded-2xl py-4 flex-row items-center justify-center gap-2">
            <Feather name="log-out" size={18} color="#ef4444" />
            <Text className="text-red-500 font-semibold text-base">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
