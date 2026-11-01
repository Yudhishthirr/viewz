
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GalleryFilters } from "./components/GalleryFilters";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryHeader } from "./components/GalleryHeader";

import { useGallery } from "./hooks/useGallery";

import {
    GalleryFilter,
    GalleryPhoto,
} from "./types/gallery.types";

import { filterGalleryPhotos } from "./utils/gallery.utils";

export default function GalleryScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<GalleryFilter>("All");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    photos,
    isLoading,
    isLoadingMore,
    error,
    permissionStatus,
    loadMore,
    refresh,
    toggleFavorite,
    requestGalleryPermission,
  } = useGallery();

  // Apply selected filter
  const filteredPhotos = useMemo(
    () => filterGalleryPhotos(photos, selectedFilter),
    [photos, selectedFilter]
  );

  // Pull to refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  // Open photo
  const handlePhotoPress = (photo: GalleryPhoto) => {
    Alert.alert(
      "Photo selected",
      `Selected photo: ${photo.id}`
    );
  };

  // Toggle favorite
  const handleFavoritePress = (photo: GalleryPhoto) => {
    toggleFavorite(photo.id);
  };

  // Permission loading
  if (permissionStatus === "loading") {
    return (
      <SafeAreaView className="flex-1 bg-[#100D14] items-center justify-center">
        <ActivityIndicator color="#F27BBE" size="large" />
      </SafeAreaView>
    );
  }

  // Permission denied
  if (permissionStatus === "denied") {
    return (
      <SafeAreaView className="flex-1 bg-[#100D14] items-center justify-center px-8">
        <Ionicons
          name="images-outline"
          size={52}
          color="#F27BBE"
        />

        <Text className="text-white text-xl font-bold mt-5">
          Gallery Access Required
        </Text>

        <Text className="text-gray-400 text-center mt-3 leading-6">
          Allow Viewz to access your photos so you can
          browse and manage your gallery.
        </Text>

        <Pressable
          onPress={requestGalleryPermission}
          className="bg-[#F27BBE] rounded-full px-7 py-3 mt-6"
        >
          <Text className="text-[#211522] font-bold">
            Grant Permission
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-[#100D14]"
      edges={["top"]}
    >
      {/* Header */}
      <GalleryHeader
        onSettingsPress={() =>
          Alert.alert("Gallery Settings", "Coming soon.")
        }
      />

      {/* Filters */}
      <GalleryFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* Gallery */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="large"
            color="#F27BBE"
          />
          <Text className="text-gray-400 text-xs mt-3">
            Loading your photos...
          </Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-white text-base font-semibold">
            {error}
          </Text>

          <Pressable
            onPress={handleRefresh}
            className="mt-4 bg-[#F27BBE] rounded-full px-6 py-3"
          >
            <Text className="text-[#211522] font-bold">
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : (
        <GalleryGrid
          photos={filteredPhotos}
          isRefreshing={isRefreshing}
          isLoadingMore={isLoadingMore}
          onRefresh={handleRefresh}
          onLoadMore={loadMore}
          onPhotoPress={handlePhotoPress}
          onFavoritePress={handleFavoritePress}
        />
      )}
    </SafeAreaView>
  );
}
