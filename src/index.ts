import { all as mergeAll } from "deepmerge";
import plugin from "tailwindcss/plugin";

import { typography, type TypographyTheme } from "./plugins/index";
import { KitOptions } from "./types";

declare module "tailwindcss" {
  interface CustomThemeConfig {
    typography: TypographyTheme;
  }
}

export default (options: Partial<KitOptions>) => {
  const resolvedTypography = typography(options.typography ?? {});

  const defaultConfig = mergeAll([{}, resolvedTypography.config ?? {}]);

  return plugin(function (api) {
    resolvedTypography.handler(api);
  }, defaultConfig);
};

export { typography };
