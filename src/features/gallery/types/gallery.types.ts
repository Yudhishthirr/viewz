export type GalleryFilter = "All" | "Favorites";

export interface GalleryPhoto {
  id: string;
  uri: string;
  width: number;
  height: number;
  creationTime: number;
  isFavorite: boolean;
}

export const GALLERY_FILTERS: GalleryFilter[] = [
  "All",
  "Favorites",
];