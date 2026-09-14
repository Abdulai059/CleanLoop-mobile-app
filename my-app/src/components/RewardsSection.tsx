import { View, Text, TouchableOpacity, Image } from "react-native";

const rewards = [
  {
    title: "Frytol Oil",
    points: "1,500 pts",
    image: require("../../assets/rewards/frytol01.png"),
    bg: "bg-green-50",
  },
  {
    title: "Books",
    points: "800 pts",
    image: require("../../assets/rewards/books01.png"),
    bg: "bg-yellow-50",
  },
  {
    title: "Flask",
    points: "1,200 pts",
    image: require("../../assets/rewards/flask01.png"),
    bg: "bg-pink-50",
  },
  {
    title: "Pen & Pencil",
    points: "500 pts",
    image: require("../../assets/rewards/pens-pencil.png"),
    bg: "bg-sky-50",
  },
  {
    title: "Bag",
    points: "2,000 pts",
    image: require("../../assets/rewards/bag01.png"),
    bg: "bg-purple-50",
  },
];

export default function RewardsSection() {
  return (
    <View className="flex-row flex-wrap gap-3.5">
      {rewards.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`w-[48%] ${item.bg} rounded-2xl p-4 items-center`}
        >
          <View className="w-24 h-24 mb-3 rounded-xl overflow-hidden items-center justify-center">
            <Image
              source={item.image}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-bold text-slate-900 mb-1 text-center">
            {item.title}
          </Text>
          <Text className="text-xs text-slate-500 font-medium">
            {item.points}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
