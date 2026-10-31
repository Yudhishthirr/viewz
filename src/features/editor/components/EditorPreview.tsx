import { Image, View } from "react-native";

type EditorPreviewProps = {
  uri: string;
  rotation: number;
};

export function EditorPreview({ uri, rotation }: EditorPreviewProps) {
  return (
    <View className="flex-1 items-center justify-center overflow-hidden px-4">
      <Image
        source={{ uri }}
        className="h-full w-full"
        resizeMode="contain"
        style={{
          transform: [{ rotate: `${rotation}deg` }],
        }}
      />
    </View>
  );
}