import "../testing/matchers";

import { generateCSS, html } from "../testing";
import { typography } from "./typography";

test("generates variants correctly", async () => {
  const css = await generateCSS(html`<div class="typography-headline"></div>`, {
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
  });

  expect(css).toMatchCSS(`
    .typography-headline {
      line-height: 1;
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
