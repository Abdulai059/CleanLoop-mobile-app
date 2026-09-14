import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

const materials = [
  {
    name: "PET",
    image: require("../../assets/materials/Pikup01.png"),
    bg: "bg-green-100",
  },
  {
    name: "HDPE",
    image: require("../../assets/materials/Pikup03.png"),
    bg: "bg-yellow-100",
  },
  {
    name: "LDPE",
    image: require("../../assets/materials/Pikup04.png"),
    bg: "bg-sky-100",
  },
  {
    name: "PLASTIC_SACHET",
    image: require("../../assets/materials/Pikup05.png"),
    bg: "bg-purple-100",
  },
  {
    name: "OTHER",
    image: require("../../assets/materials/Pikup02.png"),
    bg: "bg-orange-100",
  },
];

export default function MaterialsList() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-7"
      contentContainerStyle={{ gap: 18 }}
    >
      {materials.map((item, index) => (
        <TouchableOpacity key={index} className="items-center w-[70px]">
          <View
            className={`w-14 h-14 rounded-full items-center justify-center mb-2 overflow-hidden ${item.bg}`}
          >
            <Image
              source={item.image}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className="text-xs font-semibold text-slate-700 text-center">
            {item.name === "PLASTIC_SACHET" ? "Sachet" : item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
