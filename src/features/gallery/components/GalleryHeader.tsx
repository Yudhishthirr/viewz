
import { SlidersHorizontal } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type GalleryHeaderProps = {
  onSettingsPress?: () => void;
};

export function GalleryHeader({
  onSettingsPress,
}: GalleryHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
      <Text className="text-white text-[19px] font-bold">
        My Gallery
      </Text>

      <Pressable
        onPress={onSettingsPress}
        hitSlop={12}
        className="h-9 w-9 items-center justify-center"
      >
        <SlidersHorizontal
          size={19}
          color="#FFFFFF"
          strokeWidth={1.8}
        />
      </Pressable>
    </View>
  );
}
