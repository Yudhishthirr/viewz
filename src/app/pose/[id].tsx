
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { TRENDING_POSES } from "@/constants/trending-poses";
import { PoseHero } from "@/features/pose-details/components/PoseHero";
import { PoseInfo } from "@/features/pose-details/components/PoseInfo";
import { RelatedPoses } from "@/features/pose-details/components/RelatedPoses";
import { StartPoseButton } from "@/features/pose-details/components/StartPoseButton";


export default function PoseDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    // Find selected pose
    const pose = TRENDING_POSES.find((item) => item.id === id);

    // Handle invalid pose ID
    if (!pose) {
        return (
            <View className="flex-1 bg-[#111111] items-center justify-center">
                <Text className="text-white text-lg">
                    Pose not found
                </Text>
            </View>
        );
    }


    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View className="flex-1 bg-[#111111]">
                <View className="h-[65%]">
                    <PoseHero
                        title={pose.title}
                        image={pose.image}
                    />
                </View>

                <View className="px-5 pt-2">
                    <PoseInfo
                        category={pose.category}
                        difficulty="Easy"
                        bodyPart="Full Body"
                    />
                    <RelatedPoses
                        category={pose.category}
                        currentPoseId={pose.id}
                    />

                    <View className="mt-5">
                        <StartPoseButton
                            onPress={() => {
                                console.log("Starting pose", pose.id);
                            }}
                        />
                    </View>
                </View>
            </View>
        </>
    );

}
