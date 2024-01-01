import { KitConfigValue, KitOptions } from "../../types";
import { TypographyConfig } from "./typography.types";

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
