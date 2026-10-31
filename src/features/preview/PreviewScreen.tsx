import * as MediaLibrary from "expo-media-library";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PreviewActions } from "./components/PreviewActions";
import { PreviewImage } from "./components/PreviewImage";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{
    photoUri: string;
  }>();

  const openEditor = () => {
  router.push({
    pathname: "/editor",
    params: { photoUri },
  });
};

  const [isSaving, setIsSaving] = useState(false);

  const [permission, requestPermission] =
    MediaLibrary.usePermissions({
      writeOnly: true,
      granularPermissions: ["photo"],
    });

  const savePhoto = async () => {
    if (!photoUri || isSaving) return;

    try {
      setIsSaving(true);

      let currentPermission = permission;

      if (!currentPermission?.granted) {
        currentPermission = await requestPermission();
      }

      if (!currentPermission.granted) {
        Alert.alert("Permission Required", "Allow gallery access to save your photo.");
        return;
      }

      await MediaLibrary.Asset.create(photoUri);
      Alert.alert("Success", "Photo saved to Gallery!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to save photo.");
    } finally {
      setIsSaving(false);
    }
  };

  const sharePhoto = async () => {
    if (!photoUri) return;

    try {
      const available = await Sharing.isAvailableAsync();

      if (available) {
        await Sharing.shareAsync(photoUri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to share photo.");
    }
  };

  if (!photoUri) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="white" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <PreviewImage uri={photoUri} />

      <PreviewActions
        onRetake={() => router.back()}
        onSave={savePhoto}
        onShare={sharePhoto}
        onEdit={openEditor}
        isSaving={isSaving}
      />
      
    </SafeAreaView>
  );
}