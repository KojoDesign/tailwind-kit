import { kebabCase } from "change-case";
import plugin from "tailwindcss/plugin.js";

import { KitOptions } from "../../types.js";
import { defaultTypographyTheme } from "./typography.config.js";
import {
  VARIABLE_COLOR_BASE,
  VARIABLE_COLOR_INVERTED,
  VARIABLE_FONT_SIZE,
} from "./typography.constants.js";
import { TypographyConfig } from "./typography.types.js";
import { getColorObject, getDefaults } from "./typography.utils.js";

const { withOptions } = plugin;

const typography = withOptions<Partial<KitOptions["typography"]>>(
  ({ prefix = "typography" } = {}) =>
    ({ addUtilities, addComponents, theme }) => {
      const typography: TypographyConfig = theme("kit.typography");

      const { base, colors, sizes, variants } = typography;

      const { defaultLight, defaultFontSize, defaultDark } =
        getDefaults(typography);

      // Add color variants
      addUtilities(
        Object.entries(colors ?? {}).map(([name, color]) => {
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
        Object.keys(sizes ?? {}).map((name) => {
          const kcName = kebabCase(name);
          const className = `.${prefix}-${kcName}`;

          return {
            [className]: {
              [VARIABLE_FONT_SIZE]: `var(${VARIABLE_FONT_SIZE}-${kcName})`,
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
          const className = `.${prefix}-${kebabCase(name)}`;

          let sizeVariables = {};

          sizeVariables = Object.entries(sizes ?? {}).reduce(
            (acc, [name, size]) => ({
              ...acc,
              [`${VARIABLE_FONT_SIZE}-${kebabCase(name)}`]:
                typeof size === "function" ? size(name) : size,
            }),
            {},
          );

          return {
            [className]: {
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
