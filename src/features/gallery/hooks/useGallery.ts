
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import * as MediaLibraryLegacy from "expo-media-library/legacy";
import { useCallback, useEffect, useState } from "react";

import { GalleryPhoto } from "../types/gallery.types";

const FAVORITES_STORAGE_KEY = "@viewz_gallery_favorites";
const PAGE_SIZE = 60;

type GalleryPermissionStatus = "loading" | "granted" | "denied";

export function useGallery() {
  const [permission, requestPermission] =
    MediaLibrary.usePermissions({
      granularPermissions: ["photo"],
    });

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [endCursor, setEndCursor] = useState<string | undefined>();

  const permissionStatus: GalleryPermissionStatus =
    !permission
      ? "loading"
      : permission.granted
        ? "granted"
        : "denied";

  // Load saved favorites
  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(
        FAVORITES_STORAGE_KEY
      );

      const parsedFavorites: string[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      setFavoriteIds(parsedFavorites);

      return parsedFavorites;
    } catch (err) {
      console.error("Failed to load favorites:", err);
      return [];
    }
  }, []);

  // Fetch photos from device gallery
  const fetchPhotos = useCallback(
    async (cursor?: string, isRefresh = false) => {
      try {
        if (cursor) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }

        setError(null);

        const result =
          await MediaLibraryLegacy.getAssetsAsync({
            first: PAGE_SIZE,
            after: cursor,
            mediaType: [
              MediaLibraryLegacy.MediaType.photo,
            ],
            sortBy: [
              [
                MediaLibraryLegacy.SortBy.creationTime,
                false,
              ],
            ],
          });

        const savedFavorites = await loadFavorites();

        const formattedPhotos: GalleryPhoto[] =
          result.assets.map((asset) => ({
            id: asset.id,
            uri: asset.uri,
            width: asset.width,
            height: asset.height,
            creationTime: asset.creationTime,
            isFavorite: savedFavorites.includes(asset.id),
          }));

        setPhotos((previous) =>
          cursor && !isRefresh
            ? [...previous, ...formattedPhotos]
            : formattedPhotos
        );

        setEndCursor(result.endCursor);
        setHasNextPage(result.hasNextPage);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError("Unable to load your photos.");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [loadFavorites]
  );

  // Request permission when gallery opens
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  // Load photos after permission is granted
  useEffect(() => {
    if (permission?.granted) {
      fetchPhotos();
    } else if (permission && !permission.granted) {
      setIsLoading(false);
    }
  }, [permission?.granted, fetchPhotos]);

  // Load more photos
  const loadMore = useCallback(() => {
    if (!hasNextPage || isLoadingMore || isLoading) return;

    fetchPhotos(endCursor);
  }, [
    hasNextPage,
    isLoadingMore,
    isLoading,
    endCursor,
    fetchPhotos,
  ]);

  // Refresh gallery
  const refresh = useCallback(async () => {
    if (!permission?.granted) return;

    await fetchPhotos(undefined, true);
  }, [permission?.granted, fetchPhotos]);

  // Toggle app-level favorites
  const toggleFavorite = useCallback(
    async (photoId: string) => {
      const updatedFavorites = favoriteIds.includes(photoId)
        ? favoriteIds.filter((id) => id !== photoId)
        : [...favoriteIds, photoId];

      setFavoriteIds(updatedFavorites);

      setPhotos((previous) =>
        previous.map((photo) =>
          photo.id === photoId
            ? {
                ...photo,
                isFavorite: updatedFavorites.includes(photoId),
              }
            : photo
        )
      );

      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(updatedFavorites)
        );
      } catch (err) {
        console.error("Failed to save favorites:", err);
      }
    },
    [favoriteIds]
  );

  // Ask for permission again
  const requestGalleryPermission = useCallback(async () => {
    const result = await requestPermission();

    if (result.granted) {
      await fetchPhotos();
    }

    return result.granted;
  }, [requestPermission, fetchPhotos]);

  return {
    photos,
    favoriteIds,
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,
    permissionStatus,
    loadMore,
    refresh,
    toggleFavorite,
    requestGalleryPermission,
  };
}
