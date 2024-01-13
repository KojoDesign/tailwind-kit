import { GLOBAL_VARIABLE_PREFIX } from "../../constants";
import { createVariableName } from "../utils";

export const VARIABLE_PREFIX = createVariableName(
  GLOBAL_VARIABLE_PREFIX,
  "text",
);

export const VARIABLE_LEADING = createVariableName(VARIABLE_PREFIX, "leading");
