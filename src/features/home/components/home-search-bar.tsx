
import { Search, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { COLORS } from "@/constants/theme";

export function HomeSearchBar() {
  const [search, setSearch] = useState("");

  return (
    <View
      className="flex-row items-center rounded-full px-4 h-11 mb-5"
      style={{ backgroundColor: COLORS.surface }}
    >
      <Search
        size={17}
        color={COLORS.muted}
        strokeWidth={2}
      />

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search poses (e.g. selfie, sitting, couple...)"
        placeholderTextColor={COLORS.muted}
        className="flex-1 ml-2 text-xs text-foreground"
        returnKeyType="search"
        autoCorrect={false}
      />

      {search.length > 0 && (
        <Pressable onPress={() => setSearch("")} hitSlop={10}>
          <X size={16} color={COLORS.muted} />
        </Pressable>
      )}
    </View>
  );
}
