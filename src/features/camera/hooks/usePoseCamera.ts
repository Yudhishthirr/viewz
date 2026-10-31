import { useCameraPermissions } from "expo-camera";

export function usePoseCamera() {
  const [permission, requestPermission] = useCameraPermissions();

  return {
    permission,
    requestPermission,
    hasPermission: permission?.granted ?? false,
    isPermissionLoading: !permission,
  };
}