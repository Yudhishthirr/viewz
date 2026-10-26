
import { Text, View } from "react-native";

type PoseInfoProps = {
  category: string;
  difficulty: string;
  bodyPart: string;
};

export function PoseInfo({
  category,
  difficulty,
  bodyPart,
}: PoseInfoProps) {
  const tags = [category, difficulty, bodyPart];

  return (
    <View className="flex-row gap-2 mt-3">
      {tags.map((tag) => (
        <View
          key={tag}
          className="bg-[#252329] px-4 py-2 rounded-full"
        >
          <Text className="text-white text-xs font-medium">
            {tag}
          </Text>
        </View>
      ))}
    </View>
  );
}
