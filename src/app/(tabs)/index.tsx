
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/core/common/app-header";
import { type CategoryId } from "@/constants/categories";
import { COLORS } from "@/constants/theme";

import {
  CategorySelector,
  FeaturedPoseCard,
  HomeSearchBar,
  TrendingPoseCard,
} from "@/features/home";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>("all");

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.background }}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader />

        <HomeSearchBar />

        <CategorySelector
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <FeaturedPoseCard />

        <TrendingPoseCard id="pose-001" title="Casual Portrait" category="Portrait" image="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600" />
      </ScrollView>
    </SafeAreaView>
  );
}