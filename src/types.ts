import { expect } from "expect";
import { Config } from "tailwindcss";

export type CustomMatcher = Parameters<
  typeof expect.extend
>[0][keyof Parameters<typeof expect.extend>[0]];

export type Theme = <TDefaultValue = Config["theme"]>(
  path?: string,
  defaultValue?: TDefaultValue,
) => TDefaultValue;

export type ResolvableTo<T> = T | ((options: { theme: Theme }) => T);

export type KitConfigValue<T, Key extends string> = ResolvableTo<
  Record<Key, T>
>;

export type KitOptions = {
  typography: {
    prefix: string;
  };
};
