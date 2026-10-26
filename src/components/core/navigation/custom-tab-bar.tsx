
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Compass,
  House,
  Images,
  UserRound,
} from "lucide-react-native";

import { COLORS } from "@/constants/theme";

const TABS = [
  { name: "index", label: "Home", icon: House, href: "/(tabs)" },
  { name: "explore", label: "Explore", icon: Compass, href: "/(tabs)/explore" },
  { name: "gallery", label: "Gallery", icon: Images, href: "/(tabs)/gallery" },
  { name: "profile", label: "Profile", icon: UserRound, href: "/(tabs)/profile" },
] as const;

type CustomTabBarProps = {
  state: {
    index: number;
    routes: { name: string; key: string }[];
  };
};

export function CustomTabBar({ state }: CustomTabBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-around pt-3"
      style={{
        backgroundColor: COLORS.surface,
        paddingBottom: Math.max(insets.bottom, 10),
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
      }}
    >
      {TABS.map((tab) => {
        const isFocused =
          state.routes[state.index]?.name === tab.name;

        const Icon = tab.icon;

        return (
          <Pressable
            key={tab.name}
            onPress={() => {
              if (!isFocused) {
                router.navigate(tab.href);
              }
            }}
            className="flex-1 items-center justify-center py-1"
          >
            <Icon
              size={22}
              color={isFocused ? COLORS.primary : COLORS.muted}
              strokeWidth={isFocused ? 2.4 : 1.8}
            />

            <Text
              className="text-[11px] mt-1 font-medium"
              style={{
                color: isFocused ? COLORS.primary : COLORS.muted,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
