import { CustomTabBar } from "@/components/core/navigation/custom-tab-bar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="gallery" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}