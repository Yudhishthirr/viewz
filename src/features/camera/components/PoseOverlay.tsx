
import {
    forwardRef,
    useImperativeHandle,
} from "react";
import type { ImageSourcePropType } from "react-native";
import {
    Image,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import {
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

export type PoseOverlayRef = {
  reset: () => void;
};

type PoseOverlayProps = {
  image: ImageSourcePropType;
  opacity?: number;
};

export const PoseOverlay = forwardRef<
  PoseOverlayRef,
  PoseOverlayProps
>(function PoseOverlay({ image, opacity = 0.5 }, ref) {
  const { width } = useWindowDimensions();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(1);

  useImperativeHandle(ref, () => ({
    reset: () => {
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 1;
    },
  }));

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    });

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = Math.max(
        0.4,
        Math.min(startScale.value * event.scale, 3)
      );
    });

  const gesture = Gesture.Simultaneous(pan, pinch);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const initialWidth = width * 0.8;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.container,
          {
            width: initialWidth,
            height: initialWidth * 1.5,
            left: (width - initialWidth) / 2,
            top: "15%",
          },
          animatedStyle,
        ]}
      >
        <Image
          source={image}
          resizeMode="contain"
          style={[styles.image, { opacity }]}
        />
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
