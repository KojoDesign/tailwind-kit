import { all as mergeAll } from "deepmerge";
import tailwind3D from "tailwindcss-3d";
import plugin from "tailwindcss/plugin";

import { animation, easing, mask, shorthand, text } from "./plugins";
import { DeepPartial, KitOptions } from "./types";

export * from "./helpers";

export default (options?: DeepPartial<KitOptions>) => {
  const plugins = [easing, mask, tailwind3D({}), shorthand, text];

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
