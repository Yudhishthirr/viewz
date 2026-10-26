
import { useRouter } from "expo-router";
import { ArrowUpRight } from "lucide-react-native";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/constants/theme";

type TrendingPoseCardProps = {
  id: string;
  title: string;
  category: string;
  image: string;
};

export function TrendingPoseCard({
  id,
  title,
  category,
  image,
}: TrendingPoseCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/pose/${id}`)}
      className="w-[155px] mr-4"
    >
      {/* Image */}
      <View className="h-[190px] rounded-2xl overflow-hidden relative">
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Category Badge */}
        <View className="absolute bottom-3 left-3 bg-black/70 px-3 py-1.5 rounded-full">
          <Text className="text-white text-[10px] font-semibold">
            {category}
          </Text>
        </View>

        {/* Arrow */}
        <View
          className="absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <ArrowUpRight size={17} color="#FFFFFF" />
        </View>
      </View>

      {/* Title */}
      <Text className="text-sm font-semibold text-foreground mt-3">
        {title}
      </Text>
    </Pressable>
  );
}
