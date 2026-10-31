
import { TRENDING_POSES } from "@/constants/trending-poses";
import { CameraPreview } from "@/features/camera/components/camera-preview";
import { CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-media-library";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  PoseOverlay,
  PoseOverlayRef,
} from "./components/PoseOverlay";
import { usePoseCamera } from "./hooks/usePoseCamera";

export default function CameraScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const pose = TRENDING_POSES.find((item) => item.id === id);

  const [opacity, setOpacity] = useState(0.5);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [photo, setPhoto] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);
  const overlayRef = useRef<PoseOverlayRef>(null);

  // Camera permissions
  const {
    hasPermission,
    isPermissionLoading,
    requestPermission,
  } = usePoseCamera();

  // Gallery permissions
const [
  galleryPermission,
  requestGalleryPermission,
] = MediaLibrary.usePermissions({
  writeOnly: true,
  granularPermissions: ["photo"],
});

  // Capture photo
  const takePhoto = async () => {
    try {
      if (!cameraRef.current) return;

      const result = await cameraRef.current.takePictureAsync({
        quality: 1,
      });

      if (result?.uri) {
        router.push({
        pathname: "/preview",
        params: {
          photoUri: result.uri,
        },
      });
        // setPhoto(result.uri);
      }
    } catch (error) {
      console.error("Photo capture failed:", error);
      Alert.alert("Error", "Unable to capture photo.");
    }
  };

  // Save photo to gallery
 const savePhoto = async () => {
  try {
    if (!photo) return;

    let permission = galleryPermission;

    if (!permission?.granted) {
      permission = await requestGalleryPermission();
    }

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access to save photos."
      );
      return;
    }

    // New class-based API
    await Asset.create(photo);

    Alert.alert("Success", "Photo saved to Gallery!");
  } catch (error) {
    console.error("Photo saving failed:", error);
    Alert.alert("Error", "Unable to save photo.");
  }
};

  if (!pose) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">Pose not found</Text>
      </View>
    );
  }

  if (isPermissionLoading) {
    return <View className="flex-1 bg-black" />;
  }

  if (!hasPermission) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white text-lg mb-4">
          Camera permission is required
        </Text>

        <Pressable
          onPress={requestPermission}
          className="bg-pink-500 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">
            Allow Camera
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-black">
        {/* Camera */}
        <CameraPreview
          ref={cameraRef}
          facing={facing}
        />

        {/* Mannequin overlay */}
        {pose.referenceImage && (
          <PoseOverlay
            ref={overlayRef}
            image={pose.referenceImage}
            opacity={opacity}
          />
        )}

        {/* Pose information */}
        <View className="absolute top-16 left-5">
          <Text className="text-white text-xl font-bold">
            {pose.title}
          </Text>
          <Text className="text-white/70">
            Match your pose
          </Text>
        </View>

        {/* Camera controls */}
        <View className="absolute bottom-36 self-center flex-row items-center gap-5 rounded-full bg-black/70 px-5 py-4">
          <Pressable
            onPress={() => {
              overlayRef.current?.reset();
              setOpacity(0.5);
            }}
          >
            <Text className="text-white font-semibold">Reset</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setOpacity((prev) => Math.max(0.1, prev - 0.1))
            }
          >
            <Text className="text-white text-xl">−</Text>
          </Pressable>

          <Text className="text-white font-semibold">
            {Math.round(opacity * 100)}%
          </Text>

          <Pressable
            onPress={() =>
              setOpacity((prev) => Math.min(1, prev + 0.1))
            }
          >
            <Text className="text-white text-xl">+</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setFacing((current) =>
                current === "back" ? "front" : "back"
              )
            }
          >
            <Text className="text-white font-semibold">
              Flip
            </Text>
          </Pressable>
        </View>

        {/* Capture button */}
        <Pressable
          onPress={takePhoto}
          className="absolute bottom-10 self-center h-20 w-20 rounded-full border-4 border-white items-center justify-center"
        >
          <View className="h-14 w-14 rounded-full bg-white" />
        </Pressable>

        {/* Captured photo thumbnail */}
        {photo && (
          <View className="absolute top-28 right-5 items-center gap-2">
            <Image
              source={{ uri: photo }}
              className="w-24 h-32 rounded-xl"
              resizeMode="cover"
            />

            <Pressable
              onPress={savePhoto}
              className="bg-white rounded-full px-4 py-2"
            >
              <Text className="text-black font-semibold">
                Save Photo
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
}
