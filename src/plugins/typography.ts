import { TinyColor } from "@ctrl/tinycolor";

import plugin, { withOptions } from "tailwindcss/plugin";
import merge from "deepmerge";

import { KitConfigValue, KitOptions } from "../types";

type TypographyProperty =
  | "direction"
  | "fontFamily"
  | "fontFeatureSettings"
  | "fontKerning"
  | "fontOpticalSizing"
  | "fontSize"
  | "fontStretch"
  | "fontStyle"
  | "fontVariantAlternates"
  | "fontVariantCaps"
  | "fontVariantEastAsian"
  | "fontVariantLigatures"
  | "fontVariantNumeric"
  | "fontVariantPosition"
  | "fontVariationSettings"
  | "fontWeight"
  | "letterSpacing"
  | "lineHeight"
  | "tabSize"
  | "textAlign"
  | "textAlignLast"
  | "textDecorationColor"
  | "textDecorationLine"
  | "textDecorationStyle"
  | "textDecorationThickness"
  | "textIndent"
  | "textOverflow"
  | "textShadow"
  | "textSizeAdjust"
  | "textTransform"
  | "textWrap"
  | "verticalAlign"
  | "whiteSpaceCollapse"
  | "wordBreak"
  | "wordSpacing";

type TypographySettings = Partial<Record<TypographyProperty, string>>;

type ColorValue = string | { light: string; dark: string };

type TypographyConfig = {
  base: TypographySettings;
  variants: Record<string, TypographySettings>;
  colors: Record<string, ColorValue>;
};

const typographyConfig: KitConfigValue<TypographyConfig, "typography"> = ({
  theme,
}) => ({
  typography: {
    base: {},
    variants: {},
    colors: {
      DEFAULT: theme("colors.gray.700"),
    },
  },
});

const typography = withOptions<Partial<KitOptions["typography"]>>(
  ({ prefix = "typography" }) =>
    ({ addUtilities, theme, addComponents }) => {
      const typography: TypographyConfig = merge(
        typographyConfig({ theme }).typography,
        theme("kit.typography"),
      );

      const baseColorVariable = "--kit-typography-base-color";
      const invertColorVariable = `${baseColorVariable}-inverted`;

      const { base, colors, variants } = typography;

      addUtilities(
        Object.entries(colors).map(([name, color]) => {
          const className = `.${prefix}-${name}`;

          let light = color as string;
          let dark = null;

          if (typeof color === "object") {
            light = color.light;
            dark = color.dark;
          }

          if (!dark) {
            const tc = new TinyColor(light);
            const hsv = tc.toHsv();
            const complement = 1 - hsv.v;

            dark = new TinyColor({
              h: hsv.h,
              s: hsv.s,
              v: complement * 100,
            }).toRgbString();
          }

          return {
            [className]: {
              [baseColorVariable]: light,
              [invertColorVariable]: dark,
            },
          };
        }),
      );

      addUtilities({
        ".typography-invert": {
          [baseColorVariable]: `var(${invertColorVariable})`,
        },
      });

      addComponents(
        Object.entries(variants ?? {}).map(([name, rules]) => ({
          [`.${prefix}-${name}`]: merge(base, rules),
        })),
      );
    },
  () => ({ theme: { kit: typographyConfig } }),
);

export { typography, typographyConfig };
