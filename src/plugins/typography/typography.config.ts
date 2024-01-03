import { ResolvableTo } from "tailwindcss/types/config";

import { TypographyOptions, TypographyTheme } from "./typography.types";

export const defaultTheme: ResolvableTo<TypographyTheme> = ({ theme }) => ({
  sizes: ["sm"],
  variants: {
    DEFAULT: {
      leading: theme("lineHeight.6"),
      family: theme("fontFamily.sans"),
      weight: theme("fontWeight.normal"),
      tracking: theme("letterSpacing.wide"),
      size: theme("fontSize.2xl"),
    },
  },
  colors: {
    DEFAULT: theme("colors.gray.700"),
  },
});

export const defaultOptions: TypographyOptions = {
  classPrefix: "typography",
  themeKey: "typography",
  gradient: {
    toOpacity: 0.8,
    multiline: true,
  },
};
