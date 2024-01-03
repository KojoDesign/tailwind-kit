import { all as mergeAll } from "deepmerge";
import plugin from "tailwindcss/plugin";

import { animation, easing, typography } from "./plugins";
import { KitOptions } from "./types";

export default (options?: Partial<KitOptions>) => {
  const plugins = [
    typography(options?.typography ?? {}),
    animation(options?.animation ?? {}),
    easing,
  ];
  const defaultConfig = mergeAll([{}, ...plugins.map((p) => p.config ?? {})]);

  return plugin(
    (api) => plugins.forEach((plugin) => plugin.handler(api)),
    defaultConfig,
  );
};

export { typography };
