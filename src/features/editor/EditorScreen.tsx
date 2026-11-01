
import * as ImageManipulator from "expo-image-manipulator";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CropTool } from "./components/CropTool";
import { EditorPreview } from "./components/EditorPreview";
import { EditorToolbar } from "./components/EditorToolbar";

export default function EditorScreen() {
  const { photoUri } = useLocalSearchParams<{
    photoUri: string;
  }>();

  const [editedUri, setEditedUri] = useState(photoUri ?? "");
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCropping, setIsCropping] = useState(false);

  // Instant visual rotation
  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Reset editing
  const resetImage = () => {
    setRotation(0);
  };

  // Open crop tool
  const cropImage = async () => {
    if (!editedUri || isProcessing) return;

    try {
      setIsProcessing(true);

      // Apply pending rotation before cropping
      if (rotation !== 0) {
        const result = await ImageManipulator.manipulateAsync(
          editedUri,
          [{ rotate: rotation }],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        setEditedUri(result.uri);
        setRotation(0);
      }

      setIsCropping(true);
    } catch (error) {
      console.error("Unable to prepare crop:", error);
      Alert.alert("Error", "Unable to open crop tool.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply crop
  const applyCrop = async (crop: {
    originX: number;
    originY: number;
    width: number;
    height: number;
  }) => {
    try {
      setIsProcessing(true);

      const result = await ImageManipulator.manipulateAsync(
        editedUri,
        [{ crop }],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setEditedUri(result.uri);
      setIsCropping(false);
    } catch (error) {
      console.error("Cropping failed:", error);
      Alert.alert("Error", "Unable to crop image.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Finish editing
  const saveChanges = async () => {
    if (!editedUri || isProcessing) return;

    try {
      setIsProcessing(true);

      let finalUri = editedUri;

      if (rotation !== 0) {
        const result = await ImageManipulator.manipulateAsync(
          editedUri,
          [{ rotate: rotation }],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        finalUri = result.uri;
      }

      router.replace({
        pathname: "/preview",
        params: { photoUri: finalUri },
      });
    } catch (error) {
      console.error("Image processing failed:", error);
      Alert.alert("Error", "Unable to process image.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!photoUri) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">No photo found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />

      {isCropping ? (
        <CropTool
          uri={editedUri}
          onCancel={() => setIsCropping(false)}
          onApply={applyCrop}
        />
      ) : (
        <>
          <View className="flex-row items-center justify-between px-5 py-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-base text-white">Cancel</Text>
            </Pressable>

            <Text className="text-lg font-semibold text-white">
              Edit Photo
            </Text>

            <Pressable
              onPress={saveChanges}
              disabled={isProcessing}
            >
              <Text className="font-semibold text-white">
                {isProcessing ? "Processing..." : "Done"}
              </Text>
            </Pressable>
          </View>

          <EditorPreview
            uri={editedUri}
            rotation={rotation}
          />

          <EditorToolbar
            onRotate={rotateImage}
            onCrop={cropImage}
            onReset={resetImage}
          />
        </>
      )}
    </SafeAreaView>
  );
}