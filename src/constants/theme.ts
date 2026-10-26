
import { Platform } from "react-native";

// Brand colors
export const COLORS = {
  background: "#0B090E",
  surface: "#17131D",
  elevated: "#211B27",

  primary: "#F472B6",
  primaryDark: "#DB4F98",

  foreground: "#F8F5F9",
  muted: "#A69AAA",
  border: "#302837",

  success: "#4ADE80",
  warning: "#FBBF24",
  danger: "#FB7185",
} as const;

// Spacing system
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
} as const;

// Border radius
export const RADIUS = {
  sm: 8,
  md: 12,
  card: 18,
  lg: 24,
  full: 999,
} as const;

// Typography
export const TYPOGRAPHY = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
} as const;

// Legacy compatibility
export const Colors = {
  light: {
    text: COLORS.foreground,
    background: COLORS.background,
    backgroundElement: COLORS.surface,
    backgroundSelected: COLORS.elevated,
    textSecondary: COLORS.muted,
  },
  dark: {
    text: COLORS.foreground,
    background: COLORS.background,
    backgroundElement: COLORS.surface,
    backgroundSelected: COLORS.elevated,
    textSecondary: COLORS.muted,
  },
} as const;

export type ThemeColor = keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: TYPOGRAPHY.regular,
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: TYPOGRAPHY.regular,
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;
