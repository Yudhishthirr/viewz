import { Image, View } from "react-native";

type PreviewImageProps = {
  uri: string;
};

export function PreviewImage({ uri }: PreviewImageProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={{ uri }}
        className="h-full w-full"
        resizeMode="contain"
      />
    </View>
  );
}