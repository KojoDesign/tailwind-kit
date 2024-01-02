import { GLOBAL_VARIABLE_PREFIX } from "../../constants";
import { createVariableName } from "../utils";

export const VARIABLE_PREFIX = createVariableName(
  GLOBAL_VARIABLE_PREFIX,
  "typography",
);

export const VARIABLE_COLOR_BASE = createVariableName(VARIABLE_PREFIX, "color");

export const VARIABLE_GRADIENT_STOPS = createVariableName(
  VARIABLE_PREFIX,
  "gradient-stops",
);

export const VARIABLE_COLOR_INVERTED = createVariableName(
  VARIABLE_PREFIX,
  "color-inverted",
);

export const VARIABLE_LEADING = createVariableName(VARIABLE_PREFIX, "leading");

export const VARIABLE_FONT_SIZE = createVariableName(
  VARIABLE_PREFIX,
  "font-size",
);
