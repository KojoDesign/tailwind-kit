import { generateCSS, html } from "../../testing";
import { mask } from "./mask.plugin";

test("mask-image", async () => {
  const css = await generateCSS(html`<div class="mask-to-bl"></div>`, {
    plugins: [mask],
  });

  expect(css).toMatchSnapshot();
});

test("mask-reach", async () => {
  const css = await generateCSS(
    html`<div class="mask-circle reach-cover"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-at", async () => {
  const css = await generateCSS(
    html`<div class="mask-circle at-center"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-from", async () => {
  const css = await generateCSS(
    html`<div class="mask-to-bl mask-from-25% mask-via-50% mask-to-75%"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-from-opacity", async () => {
  const css = await generateCSS(
    html`<div
      class="mask-to-bl mask-from-opacity-25 mask-via-opacity-50 mask-to-opacity-75"
    ></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-repeat", async () => {
  const css = await generateCSS(
    html`<div class="mask-to-bl mask-repeat"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-size", async () => {
  const css = await generateCSS(
    html`<div class="mask-to-bl mask-cover"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-none", async () => {
  const css = await generateCSS(
    html`<div class="mask-none sm:mask-to-bl sm:mask-text"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-text", async () => {
  const css = await generateCSS(
    html`<div class="mask-to-bl mask-text"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});

test("mask-composite", async () => {
  const css = await generateCSS(
    html`<div class="mask-to-bl mask-subtract mask-add"></div>`,
    { plugins: [mask] },
  );

  expect(css).toMatchSnapshot();
});
