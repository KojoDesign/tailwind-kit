import { withOptions } from "tailwindcss/plugin";

import { DeepPartial } from "../../types";
import { LINEAR_DIRECTIONS } from "../constants";
import { createClassName, referenceVariable } from "../utils";
import { defaultOptions, defaultTheme } from "./typography.config";
import {
  VARIABLE_COLOR_BASE,
  VARIABLE_COLOR_INVERTED,
  VARIABLE_FONT_SIZE,
  VARIABLE_GRADIENT_STOPS,
  VARIABLE_LEADING,
} from "./typography.constants";
import {
  ColorValue,
  TypographyConfig,
  TypographyOptions,
  TypographyTheme,
  TypographyVariant,
} from "./typography.types";
import {
  getColorObject,
  getDefaultCSS,
  getFullOptions,
  getGradientStops,
  getSizeVariable,
  variantToCSS,
} from "./typography.utils";

function addColors(config: TypographyConfig) {
  const { api, options, theme } = config;
  const { addUtilities, e } = api;
  const { colors } = theme;
  const { classPrefix } = options;

  function getClass([name, color]: [string, ColorValue]) {
    const { light, dark } = getColorObject(color);

    return {
      [createClassName(classPrefix, e(name))]: {
        [VARIABLE_COLOR_BASE]: light,
        [VARIABLE_COLOR_INVERTED]: dark,
        color: referenceVariable(VARIABLE_COLOR_BASE),
      },
    };
  }

  const utilities = Object.entries(colors ?? {}).map(getClass);

  addUtilities(utilities);
}

function addSizes(config: TypographyConfig) {
  const { api, theme, options } = config;
  const { addUtilities, e } = api;
  const { sizes = [] } = theme;
  const { classPrefix } = options;

  function getClass(name: string) {
    const className = createClassName(classPrefix, e(name));
    const variableName = getSizeVariable(config, name);

    return {
      [className]: {
        [VARIABLE_FONT_SIZE]: referenceVariable(variableName),
      },
    };
  }

  const utilities = sizes.map(getClass);

  addUtilities(utilities);
}

function addBase(config: TypographyConfig) {
  const { api, options } = config;
  const { addComponents } = api;
  const { classPrefix } = options;

  addComponents({
    [createClassName(classPrefix)]: getDefaultCSS(config),
  });
}

function addVariants(config: TypographyConfig) {
  const { api, options, theme } = config;
  const { addComponents, e } = api;
  const { classPrefix } = options;
  const { variants = {} as Record<string, TypographyVariant> } = theme;

  const components = Object.entries(variants).map(([name, variant]) => {
    const css = variantToCSS(config, variant);
    return { [createClassName(classPrefix, e(name))]: css };
  });

  addComponents(components);
}

function addGradients(config: TypographyConfig) {
  const { api, options } = config;
  const { matchUtilities, theme } = api;
  const { classPrefix } = options;

  const utilityName = createClassName(classPrefix, "gradient-to").substring(1);

  function getCSS(value: string) {
    const gradientArgs = [
      value,
      referenceVariable(VARIABLE_GRADIENT_STOPS),
    ].join(", ");

    return {
      [VARIABLE_GRADIENT_STOPS]: getGradientStops(config),
      maskImage: `linear-gradient(${gradientArgs})`,
      maskSize: `100% calc(${referenceVariable(VARIABLE_LEADING)} * 1em)`,
      maskRepeat: "repeat-y",
    };
  }

  const utilities = { [utilityName]: getCSS };

  matchUtilities(utilities, { values: theme("linearDirections") });
}

function addInvert(config: TypographyConfig) {
  const { api, options } = config;
  const { classPrefix } = options;
  const { addUtilities } = api;

  const className = createClassName(classPrefix, "invert");

  // Add invert utility
  addUtilities({
    [className]: {
      [VARIABLE_COLOR_BASE]: referenceVariable(VARIABLE_COLOR_INVERTED),
      [VARIABLE_GRADIENT_STOPS]: getGradientStops(config, true),
    },
  });
}

const typography = withOptions<DeepPartial<TypographyOptions>>(
  (partialOptions) => (api) => {
    const options = getFullOptions(partialOptions);
    const theme = api.theme(options.themeKey) as TypographyTheme;
    const config: TypographyConfig = { api, options, theme };

    addBase(config);
    addColors(config);
    addSizes(config);
    addVariants(config);
    addGradients(config);
    addInvert(config);
  },
  ({ themeKey = defaultOptions.themeKey } = defaultOptions) => ({
    theme: {
      [themeKey]: defaultTheme,
      linearDirections: LINEAR_DIRECTIONS,
    },
  }),
);

export { typography, defaultTheme };
