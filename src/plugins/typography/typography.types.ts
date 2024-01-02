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

export type TypographyCSS = Partial<Record<TypographyProperty, string>>;

export type ColorValue = string | { light: string; dark: string };

export type FontSizes<T> = Record<string, ((variant: T) => string) | string>;

export type TypographyTheme<T extends string = string> = {
  base: TypographyCSS;
  variants: Record<T, TypographyCSS>;
  sizes: FontSizes<T>;
  colors: Record<string, ColorValue>;
};

export interface TypographyOptions {
  classPrefix: string;
  themeKey: string;
  gradient: {
    toOpacity: number;
    multiline: boolean;
  };
}
