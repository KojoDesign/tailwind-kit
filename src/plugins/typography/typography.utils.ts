import { TinyColor } from "@ctrl/tinycolor";

import merge from "deepmerge";

import { defaultOptions } from "./typography.config";
import { ColorValue, TypographyOptions } from "./typography.types";

export function invertColor(color: string) {
  const tc = new TinyColor(color);
  const hsv = tc.toHsv();
  const complement = 1 - hsv.v;

  return new TinyColor({
    h: hsv.h,
    s: 0,
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
    dark = invertColor(light);
  }

  return { light, dark };
}

export function getFullOptions(
  options?: Partial<TypographyOptions>,
): TypographyOptions {
  return merge(defaultOptions, options ?? {});
}
