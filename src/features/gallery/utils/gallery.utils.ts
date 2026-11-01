import {
    GalleryFilter,
    GalleryPhoto,
} from "../types/gallery.types";

export function filterGalleryPhotos(
  photos: GalleryPhoto[],
  filter: GalleryFilter
): GalleryPhoto[] {
  if (filter === "Favorites") {
    return photos.filter((photo) => photo.isFavorite);
  }

  return photos;
}

export function sortGalleryPhotos(
  photos: GalleryPhoto[]
): GalleryPhoto[] {
  return [...photos].sort(
    (a, b) => b.creationTime - a.creationTime
  );
}