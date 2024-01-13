import { ResolvableTo } from "tailwindcss/types/config";

import { TypographyOptions, TypographyTheme } from "./typography.types";

export const defaultTheme: ResolvableTo<TypographyTheme> = ({ theme }) => ({
  sizes: ["sm"],
  variants: {
    DEFAULT: {
      lineHeight: theme("lineHeight.6"),
      fontFamily: theme("fontFamily.sans"),
      fontWeight: theme("fontWeight.normal"),
      letterSpacing: theme("letterSpacing.wide"),
      fontSize: theme("fontSize.2xl"),
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
