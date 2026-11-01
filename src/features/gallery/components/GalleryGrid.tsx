
import { FlatList, View } from "react-native";

import { GalleryImageCard } from "@/features/gallery/components/GalleryImageCard";
import { GalleryPhoto } from "@/features/gallery/types/gallery.types";

type GalleryGridProps = {
  photos: GalleryPhoto[];
  isRefreshing: boolean;
  isLoadingMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onPhotoPress: (photo: GalleryPhoto) => void;
  onFavoritePress: (photo: GalleryPhoto) => void;
};

export function GalleryGrid({
  photos,
  isRefreshing,
  isLoadingMore,
  onRefresh,
  onLoadMore,
  onPhotoPress,
  onFavoritePress,
}: GalleryGridProps) {
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 24,
        flexGrow: 1,
      }}
      columnWrapperStyle={{
        gap: 7,
        marginBottom: 7,
      }}
      renderItem={({ item }) => (
        <GalleryImageCard
          photo={item}
          onPress={onPhotoPress}
          onFavoritePress={onFavoritePress}
        />
      )}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center py-20">
          <View className="h-2" />
        </View>
      }
      ListFooterComponent={
        isLoadingMore ? (
          <View className="py-5">
            <View className="h-5 w-5 self-center rounded-full border-2 border-[#F27BBE] border-t-transparent" />
          </View>
        ) : null
      }
    />
  );
}
