import postcss from "postcss";
import path from "node:path";
import tailwindcss, { Config } from "tailwindcss";

export const html = String.raw;

export async function generateCSS(html: string, config: Partial<Config>) {
  let { currentTestName } = expect.getState();

  const processor = postcss(
    tailwindcss({
      content: [{ raw: html }],
      corePlugins: {
        preflight: false,
      },
      ...config,
    }),
  );

  const tw = [
    "@tailwind base;",
    "@tailwind components;",
    "@tailwind utilities;",
  ].join("\n");

  const { css } = await processor.process(tw, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });

  return css;
}
