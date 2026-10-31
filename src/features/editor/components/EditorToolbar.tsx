import { Pressable, Text, View } from "react-native";

type EditorToolbarProps = {
  onRotate: () => void;
  onCrop: () => void;
  onReset: () => void;
};

export function EditorToolbar({
  onRotate,
  onCrop,
  onReset,
}: EditorToolbarProps) {
  return (
    <View className="flex-row items-center justify-around border-t border-neutral-800 px-4 py-5">
      <Pressable onPress={onRotate} className="items-center gap-2">
        <Text className="text-2xl text-white">↻</Text>
        <Text className="text-xs text-neutral-300">Rotate</Text>
      </Pressable>

      <Pressable onPress={onCrop} className="items-center gap-2">
        <Text className="text-2xl text-white">⌗</Text>
        <Text className="text-xs text-neutral-300">Crop</Text>
      </Pressable>

      <Pressable onPress={onReset} className="items-center gap-2">
        <Text className="text-2xl text-white">⟲</Text>
        <Text className="text-xs text-neutral-300">Reset</Text>
      </Pressable>
    </View>
  );
}