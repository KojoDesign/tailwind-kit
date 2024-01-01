import plugin, { withOptions } from "tailwindcss/plugin";
import { all as mergeAll } from "deepmerge";
import { typography } from "./plugins";
import { KitOptions } from "./types";

export default (options: Partial<KitOptions>) => {
  const resolvedTypography = typography(options.typography ?? {});

  const defaultConfig = mergeAll([{}, resolvedTypography.config ?? {}]);

  return plugin(function (api) {
    resolvedTypography.handler(api);
  }, defaultConfig);
};
