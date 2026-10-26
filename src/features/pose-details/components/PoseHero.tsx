
import { router } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

type PoseHeroProps = {
  title: string;
  image: string;
};

export function PoseHero({ title, image }: PoseHeroProps) {
  return (
    <View className="flex-1">
      {/* Hero Image */}
      <Image
        source={{ uri: image }}
        className="w-full h-full absolute"
        resizeMode="cover"
      />

      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        className="absolute top-14 left-5 bg-white/10 p-3 rounded-full"
      >
        <ChevronLeft color="white" size={24} />
      </Pressable>

      {/* Bottom Title */}
      <View className="absolute bottom-5 left-5 right-5 flex-row items-center justify-between">
        <Text className="text-white text-2xl font-bold">
          {title}
        </Text>

        <Pressable className="p-2">
          <Heart color="#EC4899" size={26} />
        </Pressable>
      </View>
    </View>
  );
}
