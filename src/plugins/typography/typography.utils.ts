import { TinyColor } from "@ctrl/tinycolor";

import { ColorValue, TypographyConfig } from "./typography.types.js";

export function invertColor(color: string) {
  const tc = new TinyColor(color);
  const hsv = tc.toHsv();
  const complement = 1 - hsv.v;

  return new TinyColor({
    h: hsv.h,
    s: hsv.s,
    v: complement * 100,
  }).toRgbString();
}

export function getColorObject(color: ColorValue) {
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

  return { light, dark };
}

export function getDefaults(config: TypographyConfig) {
  const { colors, sizes } = config;

  const { light: defaultLight, dark: defaultDark } = getColorObject(
    colors?.["DEFAULT"] ?? "inherit",
  );

  const defaultFontSize = sizes?.["DEFAULT"] ?? "inherit";

  return { defaultFontSize, defaultDark, defaultLight };
}
