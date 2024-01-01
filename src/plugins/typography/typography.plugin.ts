import { withOptions } from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";

import { KitOptions } from "../../types";
import { defaultTypographyTheme } from "./typography.config";
import {
  VARIABLE_COLOR_BASE,
  VARIABLE_COLOR_INVERTED,
  VARIABLE_FONT_SIZE,
} from "./typography.constants";
import { TypographyConfig } from "./typography.types";
import { getColorObject, getDefaults } from "./typography.utils";

const typography = withOptions<Partial<KitOptions["typography"]>>(
  ({ prefix = "typography" }) =>
    ({ addUtilities, addComponents, theme }) => {
      const typography: TypographyConfig = theme("kit.typography");

      const { base, colors, sizes, variants } = typography;

      const { defaultLight, defaultFontSize, defaultDark } =
        getDefaults(typography);

      // Add color variants
      addUtilities(
        Object.entries(colors).map(([name, color]) => {
          const className = `.${prefix}-${name}`;

          const { light, dark } = getColorObject(color);

          return {
            [className]: {
              [VARIABLE_COLOR_BASE]: light,
              [VARIABLE_COLOR_INVERTED]: dark,
            },
          };
        }),
      );

      // Add size utilities
      addUtilities(
        Object.entries(sizes).map(([name, size]) => {
          const className = `.${prefix}-${name}`;

          const { light, dark } = getColorObject(color);

          return {
            [className]: {
              [VARIABLE_COLOR_BASE]: light,
              [VARIABLE_COLOR_INVERTED]: dark,
            },
          };
        }),
      );

      // Add invert utility
      addUtilities({
        ".typography-invert": {
          [VARIABLE_COLOR_BASE]: `var(${VARIABLE_COLOR_INVERTED})`,
        },
      });

      // Add base typography component
      addComponents({
        [`.${prefix}`]: {
          ...base,
          [VARIABLE_COLOR_BASE]: defaultLight,
          [VARIABLE_COLOR_INVERTED]: defaultDark,
          [VARIABLE_FONT_SIZE]: defaultFontSize,
          color: `var(${VARIABLE_COLOR_BASE})`,
          fontSize: `var(${VARIABLE_FONT_SIZE})`,
        },
      });

      // Add typographic variants
      addComponents(
        Object.entries(variants ?? {}).map(([name, rules]) => {
          let sizeVariables = {};

          if (typeof sizes === "function") {
            sizeVariables = Object.entries(sizes(name)).reduce(
              (acc, [name, size]) => ({
                ...acc,
                [`${VARIABLE_FONT_SIZE}-${name}`]: size,
              }),
              {},
            );
          }

          return {
            [`.${prefix}-${name}`]: {
              ...rules,
              ...sizeVariables,
            },
          };
        }),
      );
    },
  () => ({ theme: { kit: defaultTypographyTheme } }),
);

export { typography, defaultTypographyTheme };
