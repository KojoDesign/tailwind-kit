import plugin from "tailwindcss/plugin";

import { createUtilityName } from "../utils";
import { VARIABLE_LEADING } from "./text.constants";

/**
 * Implementation adapted from Nestor Vera's text-fill-stroke plugin
 * https://github.com/hacknug/tailwindcss-text-fill-stroke
 */
const text = plugin(
  ({ matchUtilities, config, addBase, theme }) => {
    const classPrefix = "text";

    // Used for proper text masking via mask-text
    addBase({
      html: {
        [VARIABLE_LEADING]: config("corePlugins").includes("preflight")
          ? "1.5em"
          : "1em",
      },
    });

    matchUtilities(
      {
        text: (value) => {
          if (Array.isArray(value)) {
            const lineHeight =
              typeof value[1] === "object" ? value[1].lineHeight : value[1];

            const hasUnit = !/^[\d\.]+$/.test(lineHeight);

            return {
              [VARIABLE_LEADING]: hasUnit ? lineHeight : `${lineHeight}em`,
            };
          }
          return {};
        },
      },
      {
        type: ["absolute-size", "relative-size", "lookup"],
        values: theme("fontSize"),
      },
    );

    matchUtilities(
      {
        leading: (value) => {
          const hasUnit = !/^[\d\.]+$/.test(value);
          return { [VARIABLE_LEADING]: hasUnit ? value : `${value}em` };
        },
      },
      { values: theme("lineHeight") },
    );

    matchUtilities(
      {
        [createUtilityName(classPrefix, "fill")]: (value) => ({
          "-webkit-text-fill-color": value,
        }),
      },
      {
        values: theme("textFillColor", theme("borderColor")),
        type: ["color"],
      },
    );

    matchUtilities(
      {
        [createUtilityName(classPrefix, "stroke")]: (value) => ({
          "-webkit-text-stroke-color": value,
        }),
      },
      {
        values: theme("textStrokeColor", theme("borderColor")),
        type: "color",
      },
    );

    matchUtilities(
      {
        [createUtilityName(classPrefix, "stroke")]: (value) => ({
          "-webkit-text-stroke-width": value,
        }),
      },
      {
        values: theme("textStrokeWidth", theme("borderWidth")),
        type: "length",
      },
    );

    matchUtilities(
      {
        paint: (value) => ({
          paintOrder: value,
        }),
      },
      {
        values: theme("paintOrder"),
      },
    );
  },
  {
    theme: {
      paintOrder: {
        fsm: "fill stroke markers",
        fms: "fill markers stroke",
        sfm: "stroke fill markers",
        smf: "stroke markers fill",
        mfs: "markers fill stroke",
        msf: "markers stroke fill",
      },
    },
  },
);

export { text };
