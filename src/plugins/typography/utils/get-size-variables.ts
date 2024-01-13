import { Config } from "tailwindcss";

import { DEFAULT } from "../../constants";
import { createVariableName, referenceVariable } from "../../utils";
import { VARIABLE_FONT_SIZE } from "../typography.constants";
import { TypographyConfig, TypographyVariant } from "../typography.types";

function getVariable(config: TypographyConfig, name: string) {
  const { api } = config;
  const { e } = api;

  return createVariableName(VARIABLE_FONT_SIZE, e(name));
}

function getSizeVariables(
  config: TypographyConfig,
  variant: TypographyVariant,
) {
  const { theme } = config;
  const { sizes } = theme;

  let sizeVariables: Record<string, string> = {};

  if ("size" in variant) {
    if (typeof variant.fontSize === "object") {
      sizeVariables = Object.entries(variant.fontSize).reduce(
        (acc, [name, size]) => {
          if (sizes?.includes(name) || name === DEFAULT) {
            acc[getVariable(config, name)] = size;
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      if (variant.fontSize[DEFAULT]) {
        sizeVariables[VARIABLE_FONT_SIZE] = referenceVariable(
          getVariable(config, DEFAULT),
        );
      }
    } else {
      sizeVariables = { [VARIABLE_FONT_SIZE]: variant.fontSize as string };
    }
  }

  return sizeVariables;
}

export { getSizeVariables };
