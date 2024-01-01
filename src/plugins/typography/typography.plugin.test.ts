import "../../testing/matchers.js";

import { generateCSS, html } from "../../testing/index.js";
import { typography } from "./typography.plugin.js";

test("generates variants correctly", async () => {
  const css = await generateCSS(
    html`<div class="typography typography-headline"></div>`,
    {
      plugins: [typography],
      theme: {
        kit: {
          typography: {
            base: {
              lineHeight: 1,
            },
            variants: {
              headline: {
                fontFamily: "red",
              },
            },
          },
        },
      },
    },
  );

  expect(css).toMatchCSS(`
    .typography {
      line-height: 1;
      --kit-typography-base-color: inherit;
      --kit-typography-base-color-inverted: rgb(255, 255, 255);
      --kit-typography-font-size: inherit;
      color: var(--kit-typography-base-color);
      font-size: var(--kit-typography-font-size)
    }
    .typography-headline {
      font-family: red;
    }
  `);
});

test("generates colors correctly", async () => {
  const css = await generateCSS(
    html`<div
      class="typography-primary typography-subtle typography-invert"
    ></div>`,
    {
      plugins: [typography],
      theme: {
        kit: {
          typography: {
            colors: {
              subtle: "rgb(40, 40, 40)",
              primary: {
                light: "red",
                dark: "green",
              },
            },
          },
        },
      },
    },
  );

  expect(css).toMatchCSS(`
    .typography-subtle {
      --kit-typography-base-color: rgb(40, 40, 40);
      --kit-typography-base-color-inverted: rgb(215, 215, 215);
    }
    .typography-primary {
      --kit-typography-base-color: red;
      --kit-typography-base-color-inverted: green;
    }
    .typography-invert {
      --kit-typography-base-color: var(--kit-typography-base-color-inverted);
    }
  `);
});

test("generates sizes correctly", async () => {
  const css = await generateCSS(
    html`<div class="typography-headline typography-sm"></div>`,
    {
      plugins: [typography],
      theme: {
        kit: {
          typography: {
            variants: {
              headline: {
                fontFamily: "Lato",
              },
            },
            sizes: {
              sm: (variant: string) => {
                if (variant === "headline") {
                  return "2rem";
                }
                return "1rem";
              },
            },
          },
        },
      },
    },
  );

  expect(css).toMatchCSS(`
    .typography-headline {
      font-family: Lato;
      --kit-typography-font-size-sm: 1rem
    }
    .typography-sm {
      --kit-typography-font-size: var(--kit-typography-font-size-sm)
    }
  `);
});
