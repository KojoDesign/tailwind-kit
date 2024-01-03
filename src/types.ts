import { expect } from "expect";
import { Config } from "tailwindcss";

import { AnimationOptions } from "./plugins/animation/animation.types";
import { TypographyOptions } from "./plugins/typography/typography.types";

export type CustomMatcher = Parameters<
  typeof expect.extend
>[0][keyof Parameters<typeof expect.extend>[0]];

export type Theme = <TDefaultValue = Config["theme"]>(
  path?: string,
  defaultValue?: TDefaultValue,
) => TDefaultValue;

export type ResolvableTo<T> = T | ((options: { theme: Theme }) => T);

export type KitOptions = {
  typography: TypographyOptions;
  animation: AnimationOptions;
};
