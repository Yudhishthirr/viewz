
import { Pressable, ScrollView, Text } from "react-native";

import {
    GALLERY_FILTERS,
    GalleryFilter,
} from "../types/gallery.types";

type GalleryFiltersProps = {
  selectedFilter: GalleryFilter;
  onFilterChange: (filter: GalleryFilter) => void;
};

export function GalleryFilters({
  selectedFilter,
  onFilterChange,
}: GalleryFiltersProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 7,
      }}
    >
      {GALLERY_FILTERS.map((filter) => {
        const isSelected = selectedFilter === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => onFilterChange(filter)}
            className={`rounded-full px-5 py-[7px] items-center justify-center ${
              isSelected ? "bg-[#F27BBE]" : "bg-[#24212B]"
            }`}
          >
            <Text
              className={`text-[11px] ${
                isSelected
                  ? "text-[#211522] font-bold"
                  : "text-white font-medium"
              }`}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
