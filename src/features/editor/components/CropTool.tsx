import { useEffect, useMemo, useRef, useState } from "react";
import {
    Image,
    PanResponder,
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

type CropRect = {
  originX: number;
  originY: number;
  width: number;
  height: number;
};

type NormalizedCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CropToolProps = {
  uri: string;
  onCancel: () => void;
  onApply: (crop: CropRect) => void;
};

const MIN_SIZE = 0.12;

export function CropTool({ uri, onCancel, onApply }: CropToolProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({
    width: screenWidth,
    height: screenHeight * 0.65,
  });

  const [crop, setCrop] = useState<NormalizedCrop>({
    x: 0.1,
    y: 0.1,
    width: 0.8,
    height: 0.8,
  });

  const cropRef = useRef(crop);
  const startCrop = useRef(crop);

  useEffect(() => {
    cropRef.current = crop;
  }, [crop]);

  useEffect(() => {
    Image.getSize(
      uri,
      (width, height) => setImageSize({ width, height }),
      (error) => console.error("Unable to get image dimensions:", error)
    );
  }, [uri]);

  const imageFrame = useMemo(() => {
    if (!imageSize.width || !imageSize.height) return null;

    const scale = Math.min(
      containerSize.width / imageSize.width,
      containerSize.height / imageSize.height
    );

    const width = imageSize.width * scale;
    const height = imageSize.height * scale;

    return {
      width,
      height,
      left: (containerSize.width - width) / 2,
      top: (containerSize.height - height) / 2,
    };
  }, [imageSize, containerSize]);

  const moveResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          startCrop.current = { ...cropRef.current };
        },
        onPanResponderMove: (_, gesture) => {
          if (!imageFrame) return;

          const start = startCrop.current;

          const dx = gesture.dx / imageFrame.width;
          const dy = gesture.dy / imageFrame.height;

          setCrop({
            ...start,
            x: Math.max(0, Math.min(1 - start.width, start.x + dx)),
            y: Math.max(0, Math.min(1 - start.height, start.y + dy)),
          });
        },
      }),
    [imageFrame]
  );

  const createCornerResponder = (corner: "tl" | "tr" | "bl" | "br") =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startCrop.current = { ...cropRef.current };
      },
      onPanResponderMove: (_, gesture) => {
        if (!imageFrame) return;

        const start = startCrop.current;
        const dx = gesture.dx / imageFrame.width;
        const dy = gesture.dy / imageFrame.height;

        let left = start.x;
        let top = start.y;
        let right = start.x + start.width;
        let bottom = start.y + start.height;

        if (corner.includes("l")) left = Math.max(0, Math.min(right - MIN_SIZE, left + dx));
        if (corner.includes("r")) right = Math.min(1, Math.max(left + MIN_SIZE, right + dx));
        if (corner.includes("t")) top = Math.max(0, Math.min(bottom - MIN_SIZE, top + dy));
        if (corner.includes("b")) bottom = Math.min(1, Math.max(top + MIN_SIZE, bottom + dy));

        setCrop({
          x: left,
          y: top,
          width: right - left,
          height: bottom - top,
        });
      },
    });

  const cornerResponders = {
    tl: useMemo(() => createCornerResponder("tl"), [imageFrame]),
    tr: useMemo(() => createCornerResponder("tr"), [imageFrame]),
    bl: useMemo(() => createCornerResponder("bl"), [imageFrame]),
    br: useMemo(() => createCornerResponder("br"), [imageFrame]),
  };

  const selectRatio = (ratio: number | null) => {
    if (!ratio || !imageFrame) {
      setCrop({ x: 0, y: 0, width: 1, height: 1 });
      return;
    }

    const imageRatio = imageSize.width / imageSize.height;
    let cropWidth = 0.85;
    let cropHeight = (cropWidth * imageRatio) / ratio;

    if (cropHeight > 0.85) {
      cropHeight = 0.85;
      cropWidth = (cropHeight * ratio) / imageRatio;
    }

    setCrop({
      x: (1 - cropWidth) / 2,
      y: (1 - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight,
    });
  };

  const applyCrop = () => {
    if (!imageFrame || !imageSize.width || !imageSize.height) return;

    onApply({
      originX: Math.round(crop.x * imageSize.width),
      originY: Math.round(crop.y * imageSize.height),
      width: Math.round(crop.width * imageSize.width),
      height: Math.round(crop.height * imageSize.height),
    });
  };

  if (!imageFrame) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Loading image...</Text>
      </View>
    );
  }

  const handles = [
    { key: "tl", left: -9, top: -9 },
    { key: "tr", right: -9, top: -9 },
    { key: "bl", left: -9, bottom: -9 },
    { key: "br", right: -9, bottom: -9 },
  ] as const;

  return (
    <View className="flex-1 bg-black">
      <View className="flex-row items-center justify-between px-5 py-4">
        <Pressable onPress={onCancel}>
          <Text className="text-base text-white">Cancel</Text>
        </Pressable>
        <Text className="text-lg font-semibold text-white">Crop</Text>
        <Pressable onPress={applyCrop}>
          <Text className="font-semibold text-white">Apply</Text>
        </Pressable>
      </View>

      <View
        className="flex-1 items-center justify-center"
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setContainerSize({ width, height });
        }}
      >
        <View
          style={{
            position: "absolute",
            width: imageFrame.width,
            height: imageFrame.height,
            left: imageFrame.left,
            top: imageFrame.top,
          }}
        >
          <Image
            source={{ uri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="stretch"
          />

          <View
            {...moveResponder.panHandlers}
            style={{
              position: "absolute",
              left: `${crop.x * 100}%`,
              top: `${crop.y * 100}%`,
              width: `${crop.width * 100}%`,
              height: `${crop.height * 100}%`,
              borderWidth: 1.5,
              borderColor: "white",
            }}
          >
            {[1, 2].map((line) => (
              <View
                key={`v-${line}`}
                style={{
                  position: "absolute",
                  left: `${(line / 3) * 100}%`,
                  top: 0,
                  bottom: 0,
                  borderLeftWidth: 0.5,
                  borderColor: "#FFFFFF99",
                }}
              />
            ))}
            {[1, 2].map((line) => (
              <View
                key={`h-${line}`}
                style={{
                  position: "absolute",
                  top: `${(line / 3) * 100}%`,
                  left: 0,
                  right: 0,
                  borderTopWidth: 0.5,
                  borderColor: "#FFFFFF99",
                }}
              />
            ))}

            {handles.map((handle) => (
              <View
                key={handle.key}
                {...cornerResponders[handle.key].panHandlers}
                style={{
                  position: "absolute",
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  backgroundColor: "white",
                  ...handle,
                }}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-around border-t border-neutral-800 px-3 py-5">
        {[
          { label: "Free", ratio: null },
          { label: "1:1", ratio: 1 },
          { label: "4:5", ratio: 4 / 5 },
          { label: "16:9", ratio: 16 / 9 },
        ].map((item) => (
          <Pressable
            key={item.label}
            onPress={() => selectRatio(item.ratio)}
            className="rounded-lg bg-neutral-800 px-4 py-3"
          >
            <Text className="font-medium text-white">{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}