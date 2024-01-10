import plugin from "tailwindcss/plugin";

/**
 * Implementation adapted from Nestor Vera's text-fill-stroke plugin
 * https://github.com/hacknug/tailwindcss-text-fill-stroke
 */
const text = plugin(
  ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "text-fill": (value) => ({
          "-webkit-text-fill-color": value,
        }),
      },
      {
        values: theme("textFillColor", theme("borderColor")),
        type: ["color"],
      },
    );

    matchUtilities(
      { "text-stroke": (value) => ({ "-webkit-text-stroke-color": value }) },
      {
        values: theme("textStrokeColor", theme("borderColor")),
        type: ["color"],
      },
    );

    matchUtilities(
      {
        "text-stroke": (value) => ({
          "-webkit-text-stroke-width": value,
        }),
      },
      {
        values: theme("textStrokeWidth", theme("borderWidth")),
        type: ["length"],
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
