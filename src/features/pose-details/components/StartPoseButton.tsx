
import { Camera } from "lucide-react-native";
import { Pressable, Text } from "react-native";

type StartPoseButtonProps = {
  onPress: () => void;
};

export function StartPoseButton({ onPress }: StartPoseButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center bg-[#EC4899] rounded-full py-4 active:opacity-80"
    >
      <Camera size={20} color="#111111" strokeWidth={2.5} />

      <Text className="text-[#111111] font-bold text-base ml-3">
        Start Pose
      </Text>
    </Pressable>
  );
}
