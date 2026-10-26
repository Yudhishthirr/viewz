
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";

export function AppHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between mb-5">
      {/* App Logo */}
      <View>
        <Text className="text-3xl font-bold tracking-tight text-foreground">
          Vie<Text style={{ color: COLORS.primary }}>wz</Text>
        </Text>
      </View>

      {/* Notification */}
      <Pressable
        onPress={() => router.push("/settings")}
        className="w-10 h-10 rounded-full items-center justify-center active:opacity-70"
        style={{ backgroundColor: COLORS.surface }}
        hitSlop={8}
      >
        <Bell
          size={21}
          color={COLORS.foreground}
          strokeWidth={1.8}
        />
      </Pressable>
    </View>
  );
}
