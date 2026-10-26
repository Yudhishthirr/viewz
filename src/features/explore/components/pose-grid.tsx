
import { FlatList } from "react-native";

import type { CategoryId } from "@/constants/categories";
import { TRENDING_POSES } from "@/constants/trending-poses";
import { TrendingPoseCard } from "@/features/home/components/trending-pose-card";

type PoseGridProps = {
  selectedCategory: CategoryId;
};

export function PoseGrid({ selectedCategory }: PoseGridProps) {
  const filteredPoses =
    selectedCategory === "all"
      ? TRENDING_POSES
      : TRENDING_POSES.filter(
          (pose) => pose.category.toLowerCase() === selectedCategory
        );

  return (
    <FlatList
      data={filteredPoses}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingPoseCard
          id={item.id}
          title={item.title}
          category={item.category}
          image={item.image}
          variant="grid"
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      scrollEnabled={false}
      ListEmptyComponent={null}
    />
  );
}
