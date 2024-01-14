import { defineFontSizes } from "./define-font-sizes";

test("defines values with base styles", () => {
  const styles = defineFontSizes({
    title: {
      base: {
        fontWeight: 400,
      },
      sizes: {
        sm: "1rem",
        md: "1.5rem",
      },
    },
  });

  expect(styles).toStrictEqual({
    "title-md": [
      "1.5rem",
      {
        fontWeight: 400,
      },
    ],
    "title-sm": [
      "1rem",
      {
        fontWeight: 400,
      },
    ],
  });
});

test("defines values with shorthand syntax", () => {
  const styles = defineFontSizes({
    title: {
      base: {
        fontWeight: 400,
      },
      sizes: {
        sm: ["1rem", "1.25rem"],
        md: ["1.5rem", "1.75rem"],
      },
    },
  });

  expect(styles).toStrictEqual({
    "title-md": [
      "1.5rem",
      {
        fontWeight: 400,
        lineHeight: "1.75rem",
      },
    ],
    "title-sm": [
      "1rem",
      {
        fontWeight: 400,
        lineHeight: "1.25rem",
      },
    ],
  });
});

test("defines values without base", () => {
  const styles = defineFontSizes({
    title: {
      sm: "1rem",
      md: ["1.5rem", "1.75rem"],
    },
  });

  expect(styles).toStrictEqual({
    "title-md": ["1.5rem", "1.75rem"],
    "title-sm": "1rem",
  });
});

test("works with single sizes", () => {
  const styles = defineFontSizes({
    title: ["1rem", "1.25rem"],
    DEFAULT: {
      base: {
        fontWeight: 400,
      },
      size: ["1.5rem", "1.75rem"],
    },
    subtitle: {
      size: "1rem",
    },
  });

  expect(styles).toStrictEqual({
    title: ["1rem", "1.25rem"],
    subtitle: "1rem",
    DEFAULT: [
      "1.5rem",
      {
        fontWeight: 400,
        lineHeight: "1.75rem",
      },
    ],
  });
});
