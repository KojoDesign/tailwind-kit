import { GLOBAL_VARIABLE_PREFIX, TW_VARIABLE_PREFIX } from "../../constants";
import { LINEAR_DIRECTIONS } from "../constants";
import { createVariableName, referenceVariable } from "../utils";
import { getLinearGradient, getRadialGradient } from "./mask.utils";

export const MASK_PREFIX = "mask";

export const VARIABLE_MASK_PREFIX = createVariableName(
  GLOBAL_VARIABLE_PREFIX,
  MASK_PREFIX,
);

export const VARIABLE_MASK_REACH = createVariableName(
  VARIABLE_MASK_PREFIX,
  "reach",
);

export const VARIABLE_MASK_AT = createVariableName(VARIABLE_MASK_PREFIX, "at");

export const VARIABLE_MASK_POINT_FROM = createVariableName(
  TW_VARIABLE_PREFIX,
  "gradient-from-position",
);

export const VARIABLE_MASK_POINT_TO = createVariableName(
  TW_VARIABLE_PREFIX,
  "gradient-to-position",
);

export const VARIABLE_MASK_POINT_VIA = createVariableName(
  TW_VARIABLE_PREFIX,
  "gradient-via-position",
);

export const VARIABLE_MASK_FROM = createVariableName(
  VARIABLE_MASK_PREFIX,
  "from",
);

export const VARIABLE_MASK_TO = createVariableName(VARIABLE_MASK_PREFIX, "to");

export const VARIABLE_MASK_FROM_OPACITY = createVariableName(
  VARIABLE_MASK_PREFIX,
  "from-opacity",
);

export const VARIABLE_MASK_TO_OPACITY = createVariableName(
  VARIABLE_MASK_PREFIX,
  "to-opacity",
);

export const VARIABLE_MASK_STOPS = createVariableName(
  VARIABLE_MASK_PREFIX,
  "stops",
);

export const MASK_REACH = {
  "closest-side": "closest-side",
  "closest-corner": "closest-corner",
  "farthest-side": "farthest-side",
  "farthest-corner": "farthest-corner",
  // Aliases
  contain: "closest-side",
  cover: "farthest-corner",
};

export const MASK_DEFAULT_VARIABLES = {
  [VARIABLE_MASK_FROM_OPACITY]: "1",
  [VARIABLE_MASK_TO_OPACITY]: "0",

  [VARIABLE_MASK_FROM]: [
    `rgba(0,0,0,${referenceVariable(VARIABLE_MASK_FROM_OPACITY)})`,
    referenceVariable(VARIABLE_MASK_POINT_FROM, '""'),
  ].join(" "),

  [VARIABLE_MASK_TO]: [
    `rgba(0,0,0,${referenceVariable(VARIABLE_MASK_TO_OPACITY)})`,
    referenceVariable(VARIABLE_MASK_POINT_TO, '""'),
  ].join(" "),

  [VARIABLE_MASK_STOPS]: [
    referenceVariable(VARIABLE_MASK_FROM),
    referenceVariable(VARIABLE_MASK_TO),
  ].join(", "),

  [VARIABLE_MASK_REACH]: "closest-side",
  [VARIABLE_MASK_AT]: "center",
};

export const MASK_AT = {
  center: "center",
  t: "top",
  tl: "top left",
  tr: "top right",
  b: "bottom",
  bl: "bottom left",
  br: "bottom right",
  r: "right",
  l: "left",
};

export const MASK_COMPOSITES = {
  add: "add",
  subtract: "subtract",
  intersect: "intersect",
  exclude: "exclude",
};

export const MASK_IMAGES = {
  circle: getRadialGradient("circle"),
  ellipse: getRadialGradient("ellipse"),
  ...Object.entries(LINEAR_DIRECTIONS).reduce(
    (acc, [dir, value]) => {
      acc[`to-${dir}`] = getLinearGradient(value);
      return acc;
    },
    {} as Record<string, string>,
  ),
};
