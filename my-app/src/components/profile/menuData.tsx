// components/profile/menuData.ts
import { Feather, MaterialIcons } from "@expo/vector-icons";

export const profileMenu = [
  {
    title: "Account",
    items: [
      {
        icon: <Feather name="package" size={20} color="#64748b" />,
        title: "My Recoveries",
        route: "/recoveries",
      },
      {
        icon: <Feather name="lock" size={20} color="#64748b" />,
        title: "Change Password",
        route: "/change-password",
      },
      {
        icon: <Feather name="user-plus" size={20} color="#64748b" />,
        title: "Invite Friends",
        route: "/invite",
      },
      {
        icon: <Feather name="globe" size={20} color="#64748b" />,
        title: "Language",
        route: "/language",
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        icon: <Feather name="credit-card" size={20} color="#64748b" />,
        title: "My Wallet",
        route: "/wallet",
      },
      {
        icon: <MaterialIcons name="card-giftcard" size={20} color="#64748b" />,
        title: "Rewards",
        route: "/rewards",
      },
      {
        icon: <Feather name="clock" size={20} color="#64748b" />,
        title: "Transaction History",
        route: "/transactions",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        icon: <Feather name="file-text" size={20} color="#64748b" />,
        title: "Terms And Conditions",
        route: "/terms",
      },
      {
        icon: <Feather name="shield" size={20} color="#64748b" />,
        title: "Privacy Policy",
        route: "/privacy",
      },
      {
        icon: <Feather name="message-circle" size={20} color="#64748b" />,
        title: "Contact Us",
        route: "/contact",
      },
    ],
  },
];
