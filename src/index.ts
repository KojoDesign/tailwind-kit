import { all as mergeAll } from "deepmerge";
import plugin from "tailwindcss/plugin";

import { animation, easing, shorthand, text, typography } from "./plugins";
import { DeepPartial, KitOptions } from "./types";

export default (options?: DeepPartial<KitOptions>) => {
  const plugins = [easing, shorthand, text];

  if (options?.typography !== false) {
    plugins.push(typography(options?.typography ?? {}));
  }

  if (options?.animation !== false) {
    plugins.push(animation(options?.animation ?? {}));
  }

  const defaultConfig = mergeAll([{}, ...plugins.map((p) => p.config ?? {})]);

  return plugin((api) => {
    for (const plugin of plugins) {
      if (plugin.config) {
        plugin.handler(api);
      }
    }
  }, defaultConfig);
};

export { typography };
