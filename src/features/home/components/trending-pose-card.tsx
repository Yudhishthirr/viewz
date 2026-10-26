
import { useRouter } from "expo-router";
import {
  ArrowUpRight,
  Heart,
} from "lucide-react-native";
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
  variant?: "horizontal" | "grid";
};

export function TrendingPoseCard({
  id,
  title,
  category,
  image,
  variant = "horizontal",
}: TrendingPoseCardProps) {
  const router = useRouter();
  const isGrid = variant === "grid";

  return (
    <Pressable
      onPress={() => router.push(`/pose/${id}`)}
      className={isGrid ? "flex-1 mx-1.5 mb-4" : "w-[155px] mr-4"}
    >
      <View
        className={`rounded-2xl overflow-hidden relative ${
          isGrid ? "h-[160px]" : "h-[190px]"
        }`}
        style={{ backgroundColor: COLORS.surface }}
      >
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {!isGrid && (
          <>
            <View className="absolute bottom-3 left-3 bg-black/70 px-3 py-1.5 rounded-full">
              <Text className="text-white text-[10px] font-semibold">
                {category}
              </Text>
            </View>

            <View
              className="absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: COLORS.primary }}
            >
              <ArrowUpRight size={17} color="#FFFFFF" />
            </View>
          </>
        )}
      </View>

      <View className="flex-row items-center justify-between mt-2">
        <Text
          numberOfLines={1}
          className={`flex-1 font-semibold text-foreground ${
            isGrid ? "text-[11px]" : "text-sm"
          }`}
        >
          {title}
        </Text>

        {isGrid && (
          <Pressable
            hitSlop={8}
            onPress={(event) => {
              event.stopPropagation();
              // Favorite functionality will be added later.
            }}
          >
            <Heart
              size={16}
              color={COLORS.foreground}
              strokeWidth={1.8}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
