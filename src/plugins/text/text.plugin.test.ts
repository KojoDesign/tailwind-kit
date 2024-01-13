import { generateCSS, html } from "../../testing";
import { text } from "./text.plugin";

test("change base line height if preflight is enabled", async () => {
  const css = await generateCSS(html`<div></div>`, {
    plugins: [text],
    corePlugins: {
      preflight: true,
    },
  });

  expect(css).toMatchSnapshot();
});

test("adds line height variable for text- classes", async () => {
  const css = await generateCSS(html`<div class="text-3xl text-4xl"></div>`, {
    plugins: [text],
    theme: {
      fontSize: {
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", "1.25"],
      },
    },
  });

  expect(css).toMatchSnapshot();
});

test("adds line height variable for leading- classes", async () => {
  const css = await generateCSS(html`<div class="leading-tight"></div>`, {
    plugins: [text],
  });

  expect(css).toMatchSnapshot();
});

test("text-fill", async () => {
  const css = await generateCSS(html`<div class="text-fill-red-400"></div>`, {
    plugins: [text],
  });

  expect(css).toMatchSnapshot();
});

test("text-stroke", async () => {
  const css = await generateCSS(html`<div class="text-stroke-red-400"></div>`, {
    plugins: [text],
  });

  expect(css).toMatchSnapshot();
});

test("text-fill", async () => {
  const css = await generateCSS(html`<div class="text-stroke-2"></div>`, {
    plugins: [text],
  });

  expect(css).toMatchSnapshot();
});

test("paint-order", async () => {
  const css = await generateCSS(html`<div class="paint-fsm"></div>`, {
    plugins: [text],
  });

  expect(css).toMatchSnapshot();
});
