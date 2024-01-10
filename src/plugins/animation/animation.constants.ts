import { GLOBAL_VARIABLE_PREFIX } from "../../constants";
import { createVariableName } from "../utils";

export const VARIABLE_PREFIX = createVariableName(
  GLOBAL_VARIABLE_PREFIX,
  "animation",
);

export const VARIABLE_ENTER_PREFIX = createVariableName(
  VARIABLE_PREFIX,
  "enter",
);

export const VARIABLE_EXIT_PREFIX = createVariableName(VARIABLE_PREFIX, "exit");

export const VARIABLE_ENTER_OPACITY = createVariableName(
  VARIABLE_ENTER_PREFIX,
  "opacity",
);

export const VARIABLE_ENTER_SCALE = createVariableName(
  VARIABLE_ENTER_PREFIX,
  "scale",
);

export const VARIABLE_ENTER_ROTATE = createVariableName(
  VARIABLE_ENTER_PREFIX,
  "rotate",
);

export const VARIABLE_ENTER_TRANSLATE_X = createVariableName(
  VARIABLE_ENTER_PREFIX,
  "translate-x",
);

export const VARIABLE_ENTER_TRANSLATE_Y = createVariableName(
  VARIABLE_ENTER_PREFIX,
  "translate-y",
);

export const VARIABLE_EXIT_OPACITY = createVariableName(
  VARIABLE_EXIT_PREFIX,
  "opacity",
);

export const VARIABLE_EXIT_SCALE = createVariableName(
  VARIABLE_EXIT_PREFIX,
  "scale",
);

export const VARIABLE_EXIT_ROTATE = createVariableName(
  VARIABLE_EXIT_PREFIX,
  "rotate",
);

export const VARIABLE_EXIT_TRANSLATE_X = createVariableName(
  VARIABLE_EXIT_PREFIX,
  "translate-x",
);

export const VARIABLE_EXIT_TRANSLATE_Y = createVariableName(
  VARIABLE_EXIT_PREFIX,
  "translate-y",
);

export const VARIABLE_TIMING_FUNCTION = createVariableName(
  VARIABLE_PREFIX,
  "timing-function",
);

export const VARIABLE_DELAY = createVariableName(VARIABLE_PREFIX, "delay");

export const VARIABLE_DURATION = createVariableName(
  VARIABLE_PREFIX,
  "duration",
);

export const VARIABLE_PLAY_STATE = createVariableName(
  VARIABLE_PREFIX,
  "play-state",
);
