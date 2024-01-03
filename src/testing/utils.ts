import postcss from "postcss";
import tailwindcss, { Config } from "tailwindcss";

export const html = String.raw;

export async function generateCSS(html: string, config: Partial<Config>) {
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
    from: undefined,
  });

  return css;
}
