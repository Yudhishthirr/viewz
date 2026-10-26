import { Pressable, ScrollView, Text, View } from "react-native";

import { CATEGORIES, type CategoryId } from "@/constants/categories";
import { COLORS } from "@/constants/theme";

type CategorySelectorProps = {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
};

export function CategorySelector({
  activeCategory,
  onCategoryChange,
}: CategorySelectorProps) {
  return (
    <View className="mb-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <Pressable
              key={category.id}
              onPress={() => onCategoryChange(category.id)}
              className="px-5 py-2.5 rounded-full"
              style={{
                backgroundColor: isActive
                  ? COLORS.primary
                  : COLORS.surface,
                borderWidth: 1,
                borderColor: isActive
                  ? COLORS.primary
                  : COLORS.border,
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{
                  color: isActive
                    ? COLORS.background
                    : COLORS.foreground,
                }}
              >
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}