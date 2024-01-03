import { TinyColor } from "@ctrl/tinycolor";

import merge from "deepmerge";
import { CSSRuleObject } from "tailwindcss/types/config";

import { DEFAULT } from "../constants";
import { createVariableName, referenceVariable } from "../utils";
import { defaultOptions } from "./typography.config";
import {
  VARIABLE_COLOR_BASE,
  VARIABLE_COLOR_INVERTED,
  VARIABLE_FONT_SIZE,
  VARIABLE_LEADING,
} from "./typography.constants";
import {
  ColorValue,
  TypographyConfig,
  TypographyOptions,
  TypographyVariant,
} from "./typography.types";

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

export function stringifyFamilies(families?: string | string[]) {
  return Array.isArray(families) ? families?.join(", ") : families;
}

export function variantToCSS(
  config: TypographyConfig,
  variant: TypographyVariant,
): CSSRuleObject {
  const { theme } = config;
  const { sizes } = theme;

  const {
    leading: lineHeight,
    family,
    weight: fontWeight,
    tracking: letterSpacing,
  } = variant;

  let sizeVariables: Record<string, string> = {};

  if ("size" in variant) {
    if (typeof variant.size === "object") {
      sizeVariables = Object.entries(variant.size).reduce(
        (acc, [name, size]) => ({
          ...acc,
          // Only create variables for official sizes or the default
          ...((sizes.includes(name) || name === DEFAULT) && {
            [getSizeVariable(config, name)]: size,
          }),
        }),
        {} as Record<string, string>,
      );

      if (variant.size[DEFAULT]) {
        sizeVariables[VARIABLE_FONT_SIZE] = referenceVariable(
          getSizeVariable(config, DEFAULT),
        );
      }
    } else {
      sizeVariables = { [VARIABLE_FONT_SIZE]: variant.size as string };
    }
  }

  const fontFamily = stringifyFamilies(family);

  return {
    ...sizeVariables,
    // We store this in a variable so we can use it in the gradient variants
    ...(lineHeight && { [VARIABLE_LEADING]: lineHeight }),
    ...(fontWeight && { fontWeight }),
    ...(letterSpacing && { letterSpacing }),
    ...(fontFamily && { fontFamily }),
  };
}

export function getSizeVariable(config: TypographyConfig, name: string) {
  if (name === DEFAULT) {
    return VARIABLE_FONT_SIZE;
  }

  const { api } = config;
  const { e } = api;

  return createVariableName(VARIABLE_FONT_SIZE, e(name));
}

export function getDefaultCSS(config: TypographyConfig): CSSRuleObject {
  const { theme } = config;
  const { colors = {} as Record<string, ColorValue> } = theme;
  const { [DEFAULT]: baseColor } = colors;
  const { light, dark } = getColorObject(baseColor);

  return {
    [VARIABLE_COLOR_BASE]: light ?? "inherit",
    [VARIABLE_COLOR_INVERTED]: dark ?? "inherit",
    color: referenceVariable(VARIABLE_COLOR_BASE),
    fontSize: referenceVariable(VARIABLE_FONT_SIZE),
    lineHeight: referenceVariable(VARIABLE_LEADING),
  };
}

export function getGradientStops(
  config: TypographyConfig,
  reverse: boolean = false,
): string {
  const {
    options: {
      gradient: { toOpacity },
    },
  } = config;

  const stops = [`rgba(255, 255, 255, ${toOpacity})`, `rgba(255, 255, 255, 1)`];

  if (reverse) {
    stops.reverse();
  }

  return stops.map((s, i) => `${s} ${i * 100}%`).join(", ");
}
