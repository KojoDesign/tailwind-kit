const scales = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augmentedFourth: 1.414,
  perfectFifth: 1.5,
  goldenRatio: 1.618,
};

type Scale = number | keyof typeof scales;

interface ViewportOptions {
  fontSize: number;
  viewportWidth: number;
  scale: Scale;
}

interface ResponsiveScale {
  min: ViewportOptions;
  max: ViewportOptions;
}

interface Options {
  baseSize: number;
}

function getScale(scale: Scale) {
  return typeof scale === "number" ? scale : scales[scale];
}

function getValue(step: number, multiplier: number) {
  return multiplier ** step;
}

function getClamp(
  base: number,
  min: Omit<ViewportOptions, "scale">,
  max: Omit<ViewportOptions, "scale">,
) {
  const maxWidth = max.viewportWidth / base;
  const minWidth = min.viewportWidth / base;

  const minus = -1 * minWidth;
  const width = maxWidth - minWidth;

  const minSize = min.fontSize / base;
  const maxSize = max.fontSize / base;

  const slope = (maxSize - minSize) / width;
  const intersection = minus * slope + minSize;

  const args = [
    `${minSize}rem`,
    `${intersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw`,
    `${maxSize}rem`,
  ].join(", ");

  return `clamp(${args})`;
}

export function typescale(
  scale: Scale | ResponsiveScale,
  options?: Partial<Options>,
) {
  const { baseSize = 16 } = options ?? {};

  return {
    get(step: number) {
      if (typeof scale === "object") {
        const {
          min: { viewportWidth: minVP, scale: minScale, fontSize: minFontSize },
          max: { viewportWidth: maxVP, scale: maxScale, fontSize: maxFontSize },
        } = scale;

        const minMultiplier = getScale(minScale);
        const maxMultiplier = getScale(maxScale);

        const min = getValue(step, minMultiplier) * minFontSize;
        const max = getValue(step, maxMultiplier) * maxFontSize;

        return getClamp(
          baseSize,
          { viewportWidth: minVP, fontSize: min },
          { viewportWidth: maxVP, fontSize: max },
        );
      }

      return `${getValue(step, getScale(scale))}rem`;
    },
  };
}
