
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { type CategoryId } from "@/constants/categories";
import { COLORS } from "@/constants/theme";

import { ExploreHeader } from "@/features/explore/components/explore-header";
import { PoseGrid } from "@/features/explore/components/pose-grid";
import { CategorySelector } from "@/features/home/components/category-selector";

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId>("all");

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.background }}
      edges={["top"]}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ExploreHeader />

        <View className="mb-2">
          <CategorySelector
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </View>

        <PoseGrid selectedCategory={selectedCategory} />
      </ScrollView>
    </SafeAreaView>
  );
}
