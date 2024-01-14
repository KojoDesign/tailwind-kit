import { typescale } from "./typescale";

test("generates static values correctly", () => {
  const scale = typescale("majorThird");

  expect(scale.get(0)).toBe("1rem");
  expect(scale.get(1)).toBe("1.25rem");
});

test("generates clamp values correctly", () => {
  const scale = typescale({
    min: { viewportWidth: 320, fontSize: 16, scale: "majorThird" },
    max: { viewportWidth: 1440, fontSize: 32, scale: "minorSecond" },
  });

  expect(scale.get(0)).toBe("clamp(1rem, 0.7143rem + 1.4286vw, 2rem)");
  expect(scale.get(1)).toBe("clamp(1.25rem, 0.9974rem + 1.2629vw, 2.134rem)");
});
