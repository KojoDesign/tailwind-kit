export type TypographyProperty =
  | "direction"
  | "fontFamily"
  | "fontFeatureSettings"
  | "fontKerning"
  | "fontOpticalSizing"
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

export type TypographySettings = Partial<Record<TypographyProperty, string>>;

export type ColorValue = string | { light: string; dark: string };

export type FontSizes<T> = { DEFAULT?: string } & Record<
  string,
  ((variant: T) => string) | string
>;

export type TypographyConfig<T extends string = string> = {
  base: TypographySettings;
  variants: Record<T, TypographySettings>;
  sizes: FontSizes<T>;
  colors: Record<string, ColorValue>;
};
