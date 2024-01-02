import { ResolvableTo } from "tailwindcss/types/config";

import { TypographyOptions, TypographyTheme } from "./typography.types";

export const defaultTheme: ResolvableTo<TypographyTheme> = ({ theme }) => ({
  base: {},
  sizes: {},
  variants: {},
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
