import kebabCase from "kebab-case";
import plugin from "tailwindcss/plugin";

import { LINEAR_DIRECTIONS } from "../constants";
import {
  createClassName,
  createVariableName,
  referenceVariable,
} from "../utils";
import { defaultOptions, defaultTheme } from "./typography.config";
import {
  VARIABLE_COLOR_BASE,
  VARIABLE_COLOR_INVERTED,
  VARIABLE_FONT_SIZE,
  VARIABLE_GRADIENT_STOPS,
  VARIABLE_LEADING,
} from "./typography.constants";
import { TypographyOptions, TypographyTheme } from "./typography.types";
import { getColorObject, getFullOptions } from "./typography.utils";

const { withOptions } = plugin;

const typography = withOptions<Partial<TypographyOptions>>(
  (options) =>
    ({ addUtilities, matchUtilities, addComponents, e, theme }) => {
      const { classPrefix, gradient, themeKey } = getFullOptions(options);

      const { base, colors, sizes, variants } = theme(
        themeKey,
      ) as TypographyTheme;

      const { light: defaultLight, dark: defaultDark } = getColorObject(
        colors?.["DEFAULT"] ?? "inherit",
      );

      const defaultFontSize =
        (typeof sizes?.["DEFAULT"] === "function"
          ? sizes?.["DEFAULT"]("")
          : sizes?.["DEFAULT"]) ?? "inherit";

      const baseLineHeight = base?.lineHeight?.toString() ?? "1em";

      const defaultGradientStops = [
        `rgba(255, 255, 255, ${gradient.toOpacity})`,
        `rgba(255, 255, 255, 1)`,
      ];

      // Add color variants
      addUtilities(
        Object.entries(colors ?? {}).map(([name, color]) => {
          const { light, dark } = getColorObject(color);
          return {
            [createClassName(classPrefix, e(name))]: {
              [VARIABLE_COLOR_BASE]: light,
              [VARIABLE_COLOR_INVERTED]: dark,
              color: referenceVariable(VARIABLE_COLOR_BASE),
            },
          };
        }),
      );

      // Add size utilities
      addUtilities(
        Object.keys(sizes ?? {}).map((name) => ({
          [createClassName(classPrefix, e(name))]: {
            [VARIABLE_FONT_SIZE]: referenceVariable(
              createVariableName(VARIABLE_FONT_SIZE, e(name)),
            ),
          },
        })),
      );

      // Add base typography component
      addComponents({
        [`.${classPrefix}`]: {
          ...base,
          [VARIABLE_COLOR_BASE]: defaultLight,
          [VARIABLE_COLOR_INVERTED]: defaultDark,
          [VARIABLE_FONT_SIZE]: defaultFontSize,
          [VARIABLE_LEADING]: baseLineHeight,
          color: referenceVariable(VARIABLE_COLOR_BASE),
          fontSize: referenceVariable(VARIABLE_FONT_SIZE),
          fontFamily:
            (Array.isArray(base?.fontFamily)
              ? base?.fontFamily.join(", ")
              : base?.fontFamily) ?? "inherit",
        },
      });

      // Add typographic variants
      addComponents(
        Object.entries(variants ?? {}).map(([name, rules]) => {
          let sizeVariables = {};

          sizeVariables = Object.entries(sizes ?? {}).reduce(
            (acc, [sizeName, size]) => {
              const customSize = typeof size === "function" ? size(name) : size;

              const variableName =
                sizeName === "DEFAULT"
                  ? VARIABLE_FONT_SIZE
                  : createVariableName(VARIABLE_FONT_SIZE, e(sizeName));

              return {
                ...acc,
                ...(customSize != null && { [variableName]: customSize }),
              };
            },
            {},
          );

          return {
            [createClassName(classPrefix, e(name))]: {
              ...rules,
              ...sizeVariables,
              [VARIABLE_LEADING]: rules.lineHeight ?? "1em",
              fontFamily:
                (Array.isArray(rules?.fontFamily)
                  ? rules?.fontFamily.join(", ")
                  : rules?.fontFamily) ?? "inherit",
            },
          };
        }),
      );

      matchUtilities(
        {
          [createClassName(classPrefix, "gradient-to").substring(1)]: (
            value,
          ) => ({
            [VARIABLE_GRADIENT_STOPS]: defaultGradientStops
              .map((s, i) => `${s} ${i * 100}%`)
              .join(", "),
            maskImage: `linear-gradient(${value}, ${referenceVariable(
              VARIABLE_GRADIENT_STOPS,
            )})`,
            maskRepeat: "repeat-y",
            maskSize: `100% calc(${referenceVariable(VARIABLE_LEADING)} * 1em)`,
          }),
        },
        {
          values: theme("linearDirections"),
        },
      );

      // Add invert utility
      addUtilities({
        [createClassName(classPrefix, "invert")]: {
          [VARIABLE_COLOR_BASE]: referenceVariable(VARIABLE_COLOR_INVERTED),
          [VARIABLE_GRADIENT_STOPS]: defaultGradientStops
            .slice()
            .reverse()
            .map((s, i) => `${s} ${i * 100}%`)
            .join(", "),
        },
      });
    },
  ({ themeKey = defaultOptions.themeKey } = defaultOptions) => ({
    theme: {
      [themeKey]: defaultTheme,
      linearDirections: LINEAR_DIRECTIONS,
    },
  }),
);

export { typography, defaultTheme };
