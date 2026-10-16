import { DefaultTheme, type Theme } from "@react-navigation/native";

// Native navigation needs concrete colors; keep these aligned with global.css.
export const palette = {
  primary: "#4F46E5",
  secondary: "#0F766E",
  white: "#F8FAFC",
  black: "#0F172A",
} as const;

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary,
    background: palette.white,
    card: palette.white,
    text: palette.black,
    border: "rgba(15, 23, 42, 0.12)",
    notification: palette.secondary,
  },
  fonts: {
    regular: { fontFamily: "Lato_400Regular", fontWeight: "normal" },
    medium: { fontFamily: "Lato_700Bold", fontWeight: "normal" },
    bold: { fontFamily: "Lato_700Bold", fontWeight: "normal" },
    heavy: { fontFamily: "Lato_700Bold", fontWeight: "normal" },
  },
};
