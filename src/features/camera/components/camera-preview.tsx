
import { CameraType, CameraView } from "expo-camera";
import { forwardRef } from "react";
import { StyleSheet } from "react-native";

type CameraPreviewProps = {
  facing: CameraType;
};

export const CameraPreview = forwardRef<
  CameraView,
  CameraPreviewProps
>(function CameraPreview({ facing }, ref) {
  return (
    <CameraView
      ref={ref}
      key={facing}
      style={StyleSheet.absoluteFill}
      facing={facing}
    />
  );
});
