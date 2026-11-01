
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable } from "react-native";

import { GalleryPhoto } from "../types/gallery.types";

type GalleryImageCardProps = {
  photo: GalleryPhoto;
  onPress: (photo: GalleryPhoto) => void;
  onFavoritePress: (photo: GalleryPhoto) => void;
};

export function GalleryImageCard({
  photo,
  onPress,
  onFavoritePress,
}: GalleryImageCardProps) {
  return (
    <Pressable
      onPress={() => onPress(photo)}
      className="flex-1 aspect-square overflow-hidden rounded-xl bg-[#24212B]"
    >
      <Image
        source={{ uri: photo.uri }}
        contentFit="cover"
        transition={150}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <Pressable
        onPress={() => onFavoritePress(photo)}
        hitSlop={8}
        className="absolute right-1 top-1 h-7 w-7 items-center justify-center"
      >
        <Ionicons
          name={photo.isFavorite ? "heart" : "heart-outline"}
          size={18}
          color={photo.isFavorite ? "#FFFFFF" : "#FFFFFF"}
        />
      </Pressable>
    </Pressable>
  );
}
