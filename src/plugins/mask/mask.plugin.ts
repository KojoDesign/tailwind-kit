import plugin from "tailwindcss/plugin";

import { VARIABLE_LEADING } from "../text/text.constants";
import {
  createClassName,
  createUtilityName,
  referenceVariable,
} from "../utils";
import {
  MASK_AT,
  MASK_COMPOSITES,
  MASK_DEFAULT_VARIABLES,
  MASK_IMAGES,
  MASK_PREFIX,
  MASK_REACH,
  VARIABLE_MASK_AT,
  VARIABLE_MASK_FROM,
  VARIABLE_MASK_FROM_OPACITY,
  VARIABLE_MASK_POINT_VIA,
  VARIABLE_MASK_REACH,
  VARIABLE_MASK_STOPS,
  VARIABLE_MASK_TO,
  VARIABLE_MASK_TO_OPACITY,
} from "./mask.constants";

export const mask = plugin(
  ({ addUtilities, matchUtilities, theme }) => {
    matchUtilities(
      {
        mask: (value) => ({
          ...MASK_DEFAULT_VARIABLES,
          maskImage: value,
        }),
      },
      {
        type: ["lookup", "image", "url"],
        values: theme("maskImage"),
      },
    );

    /* -------------------------------------------------------------------------- */
    /*                                Radial Masks                                */
    /* -------------------------------------------------------------------------- */

    /* ---------------------------------- Size ---------------------------------- */

    matchUtilities(
      {
        reach: (value) => ({
          [VARIABLE_MASK_REACH]: value,
        }),
      },
      { values: MASK_REACH },
    );

    /* -------------------------------- Position -------------------------------- */

    matchUtilities(
      {
        at: (value) => ({
          [VARIABLE_MASK_AT]: value,
        }),
      },
      { values: MASK_AT },
    );

    /* -------------------------------------------------------------------------- */
    /*                                 Mask Stops                                 */
    /* -------------------------------------------------------------------------- */

    /* ------------------------------ Stop Opacity ------------------------------ */

    matchUtilities(
      {
        [createUtilityName(MASK_PREFIX, "opacity-from")]: (value) => ({
          [VARIABLE_MASK_FROM_OPACITY]: value,
        }),
        [createUtilityName(MASK_PREFIX, "opacity-to")]: (value) => ({
          [VARIABLE_MASK_TO_OPACITY]: value,
        }),
        [createUtilityName(MASK_PREFIX, "opacity-via")]: (value) => ({
          [VARIABLE_MASK_POINT_VIA]: "",
          [VARIABLE_MASK_STOPS]: [
            referenceVariable(VARIABLE_MASK_FROM),
            `rgba(0,0,0,${value})`,
            referenceVariable(VARIABLE_MASK_POINT_VIA),
            referenceVariable(VARIABLE_MASK_TO),
          ].join(", "),
        }),
      },
      { values: theme("opacity"), type: "number" },
    );

    /* -------------------------------------------------------------------------- */
    /*                                   Shared                                   */
    /* -------------------------------------------------------------------------- */

    /* --------------------------------- Repeat --------------------------------- */

    addUtilities({
      [createUtilityName(MASK_PREFIX, "repeat")]: {
        maskRepeat: "repeat",
      },
      [createUtilityName(MASK_PREFIX, "repeat-x")]: {
        maskRepeat: "repeat-x",
      },
      [createUtilityName(MASK_PREFIX, "repeat-y")]: {
        maskRepeat: "repeat-y",
      },
      [createUtilityName(MASK_PREFIX, "repeat-space")]: {
        maskRepeat: "space",
      },
      [createUtilityName(MASK_PREFIX, "round")]: {
        maskRepeat: "round",
      },
      [createUtilityName(MASK_PREFIX, "no-repeat")]: {
        maskRepeat: "no-repeat",
      },
    });

    /* ---------------------------------- Size ---------------------------------- */

    addUtilities({
      [createClassName(MASK_PREFIX, "text")]: {
        maskSize: `100% ${referenceVariable(VARIABLE_LEADING)}`,
      },
    });

    matchUtilities(
      {
        [createUtilityName(MASK_PREFIX)]: (value) => ({
          maskSize: value,
        }),
      },
      {
        values: theme("backgroundSize"),
        type: [
          "lookup",
          "length",
          "percentage",
          "absolute-size",
          "relative-size",
        ],
      },
    );

    /* --------------------------------- Compose -------------------------------- */

    matchUtilities(
      {
        [createUtilityName(MASK_PREFIX)]: (value) => ({
          maskComposite: value,
          // Compatibility fix
          ...(value === "subtract" && { "--webkit-mask-composite": "xor" }),
        }),
      },
      {
        values: theme("maskComposite"),
      },
    );

    /* -------------------------------- Position -------------------------------- */

    matchUtilities(
      {
        [createUtilityName(MASK_PREFIX, "position")]: (value) => ({
          maskPosition: value,
        }),
      },
      {
        values: theme("backgroundPosition"),
      },
    );
  },
  {
    theme: {
      maskComposite: MASK_COMPOSITES,
      maskImage: MASK_IMAGES,
    },
  },
);
