import { KitConfigValue } from "../../types.js";
import { TypographyConfig } from "./typography.types.js";

export const defaultTypographyTheme: KitConfigValue<
  TypographyConfig,
  "typography"
> = ({ theme }) => ({
  typography: {
    base: {},
    sizes: {},
    variants: {},
    colors: {
      DEFAULT: theme("colors.gray.700"),
    },
  },
});
