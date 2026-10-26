
import { useRouter } from "expo-router";
import { ArrowUpRight, Sparkles } from "lucide-react-native";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/constants/theme";

const FEATURED_POSE = {
  id: "featured-01",
  title: "The Perfect Portrait",
  description: "Find your angle. Capture your confidence.",
  image:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000",
};

export function FeaturedPoseCard() {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/pose/${FEATURED_POSE.id}`);
  };

  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-3">
        <Sparkles color={COLORS.primary} size={16} />

        <Text
          className="ml-2 text-xs font-bold tracking-widest"
          style={{ color: COLORS.primary }}
        >
          FEATURED POSE
        </Text>
      </View>

      <ImageBackground
        source={{ uri: FEATURED_POSE.image }}
        style={styles.image}
        imageStyle={styles.imageRadius}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View className="flex-1 justify-end p-5">
          <View
            className="self-start rounded-full px-3 py-1 mb-3"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Text className="text-xs font-bold text-white">
              EDITOR'S PICK
            </Text>
          </View>

          <Text className="text-2xl font-bold text-white">
            {FEATURED_POSE.title}
          </Text>

          <Text className="text-sm text-white mt-2 mb-5">
            {FEATURED_POSE.description}
          </Text>

          <Pressable
            onPress={handlePress}
            className="flex-row items-center justify-center rounded-xl py-3.5"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Text className="text-sm font-bold text-white mr-2">
              Try Now
            </Text>

            <ArrowUpRight color="#FFFFFF" size={18} />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 360,
    width: "100%",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
});
