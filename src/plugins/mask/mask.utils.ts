import { referenceVariable } from "../utils";
import {
  VARIABLE_MASK_AT,
  VARIABLE_MASK_REACH,
  VARIABLE_MASK_STOPS,
} from "./mask.constants";

export function getRadialGradient(shape: string) {
  let gradient = "radial-gradient(";

  gradient += shape;
  gradient += ` ${referenceVariable(VARIABLE_MASK_REACH)}`;
  gradient += ` at ${referenceVariable(VARIABLE_MASK_AT)}, `;
  gradient += referenceVariable(VARIABLE_MASK_STOPS);

  return gradient;
}

export function getLinearGradient(direction: string) {
  return `linear-gradient(${[
    direction,
    referenceVariable(VARIABLE_MASK_STOPS),
  ].join(", ")})`;
}
