
import { useRouter } from "expo-router";
import { ArrowLeft, SlidersHorizontal } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export function ExploreHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between mb-5">
      <View className="flex-row items-center gap-3">
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <ArrowLeft size={23} color={COLORS.foreground} />
        </Pressable>

        <Text className="text-xl font-bold text-foreground">
          All Poses
        </Text>
      </View>

      <Pressable
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: COLORS.surface }}
        onPress={() => {
          // Filter options will be added later.
        }}
      >
        <SlidersHorizontal size={19} color={COLORS.foreground} />
      </Pressable>
    </View>
  );
}
