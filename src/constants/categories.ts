export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "selfie", label: "Selfie" },
  { id: "standing", label: "Standing" },
  { id: "sitting", label: "Sitting" },
  { id: "couple", label: "Couple" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];