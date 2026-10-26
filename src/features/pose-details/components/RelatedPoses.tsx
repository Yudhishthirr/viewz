
import { TRENDING_POSES } from "@/constants/trending-poses";
import { FlatList, Image, View } from "react-native";

type RelatedPosesProps = {
  category: string;
  currentPoseId: string;
};

export function RelatedPoses({
  category,
  currentPoseId,
}: RelatedPosesProps) {
  const relatedPoses = TRENDING_POSES.filter(
    (pose) =>
      pose.category === category &&
      pose.id !== currentPoseId
  );

  if (relatedPoses.length === 0) return null;

  return (
    <View className="mt-4">
      <FlatList
        data={relatedPoses}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            className="w-[72px] h-[100px] rounded-xl"
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}
