import { all as mergeAll } from "deepmerge";
import plugin from "tailwindcss/plugin";

import { animation, easing, mask, shorthand, text } from "./plugins";
import { DeepPartial, KitOptions } from "./types";

export default (options?: DeepPartial<KitOptions>) => {
  const plugins = [easing, mask, shorthand, text];

  if (options?.animation !== false) {
    plugins.push(animation(options?.animation ?? {}));
  }

  const defaultConfig = mergeAll([{}, ...plugins.map((p) => p.config ?? {})]);

  return plugin((api) => {
    for (const plugin of plugins) {
      plugin.handler(api);
    }
  }, defaultConfig);
};
