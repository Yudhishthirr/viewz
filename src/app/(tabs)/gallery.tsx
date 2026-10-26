
import { Text, View } from "react-native";

export default function GalleryScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-3xl font-bold text-foreground">
        Gallery
      </Text>
      <Text className="mt-2 text-muted">
        Find Your Perfect Pose
      </Text>
    </View>
  );
}
