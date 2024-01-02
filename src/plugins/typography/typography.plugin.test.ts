import "../../testing/matchers";

import { generateCSS, html } from "../../testing/index";
import { typography } from "./typography.plugin";

test("generates variants correctly", async () => {
  const css = await generateCSS(
    html`<div class="typography typography-headline"></div>`,
    {
      plugins: [typography],
      theme: {
        typography: {
          base: {
            lineHeight: "1",
          },
          variants: {
            headline: {
              fontFamily: "red",
            },
          },
        },
      },
    },
  );

  expect(css).toMatchSnapshot();
});

test("generates colors correctly", async () => {
  const css = await generateCSS(
    html`<div
      class="typography typography-primary typography-subtle typography-invert"
    ></div>`,
    {
      plugins: [typography],
      theme: {
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
  );

  expect(css).toMatchSnapshot();
});

test("generates sizes correctly", async () => {
  const css = await generateCSS(
    html`<div class="typography typography-headline typography-sm"></div>`,
    {
      plugins: [typography],
      theme: {
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
  );

  expect(css).toMatchSnapshot();
});

test("generates gradients correctly", async () => {
  const css = await generateCSS(
    html`<div
      class="typography typography-headline typography-gradient-to-b typography-sm"
    ></div>`,
    {
      plugins: [typography],
      theme: {
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
  );

  expect(css).toMatchSnapshot();
});
