import { Pressable, Text, View } from "react-native";

type PreviewActionsProps = {
  onRetake: () => void;
  onSave: () => void;
  onShare: () => void;
  onEdit: () => void;
  isSaving: boolean;
};

export function PreviewActions({
  onRetake,
  onSave,
  onShare,
  onEdit,
  isSaving,
}: PreviewActionsProps) {
  return (
    <View className="flex-row items-center gap-3 px-5 py-6">
      <Pressable
        onPress={onRetake}
        className="flex-1 items-center rounded-xl bg-neutral-800 py-4"
      >
        <Text className="font-semibold text-white">Retake</Text>
      </Pressable>

      <Pressable
        onPress={onSave}
        disabled={isSaving}
        className="flex-1 items-center rounded-xl bg-white py-4"
      >
        <Text className="font-semibold text-black">
          {isSaving ? "Saving..." : "Save"}
        </Text>
      </Pressable>

      <Pressable
        onPress={onShare}
        className="flex-1 items-center rounded-xl bg-neutral-800 py-4"
      >
        <Text className="font-semibold text-white">Share</Text>
      </Pressable>

      <Pressable onPress={onEdit}>
  <Text className="font-semibold text-white">Edit</Text>
</Pressable>
    </View>
  );
}