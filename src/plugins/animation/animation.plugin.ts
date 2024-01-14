import { withOptions } from "tailwindcss/plugin";
import { CSSRuleObject, PluginUtils } from "tailwindcss/types/config";

import {
  createClassName,
  createUtilityName,
  referenceVariable,
} from "../utils";
import {
  VARIABLE_DELAY,
  VARIABLE_DURATION,
  VARIABLE_ENTER_OPACITY,
  VARIABLE_ENTER_ROTATE,
  VARIABLE_ENTER_SCALE,
  VARIABLE_ENTER_TRANSLATE_X,
  VARIABLE_ENTER_TRANSLATE_Y,
  VARIABLE_EXIT_OPACITY,
  VARIABLE_EXIT_ROTATE,
  VARIABLE_EXIT_SCALE,
  VARIABLE_EXIT_TRANSLATE_X,
  VARIABLE_EXIT_TRANSLATE_Y,
  VARIABLE_PLAY_STATE,
  VARIABLE_TIMING_FUNCTION,
} from "./animation.constants";
import { AnimationOptions } from "./animation.types";

function filterDefault<K extends string, V>(
  values: Record<K, V>,
): Record<K, V> {
  return Object.fromEntries(
    Object.entries(values).filter(([key]) => key !== "DEFAULT"),
  ) as Record<K, V>;
}

function translate3D(x: string, y: string, z: string) {
  return `translate3d(${x}, ${y}, ${z})`;
}

function scale3D(x: string, y: string, z: string) {
  return `scale3d(${x}, ${y}, ${z})`;
}

function rotate(degrees: string) {
  return `rotate(${degrees})`;
}

/**
 * Implementation adapted from Jamie Kyle's tailwindcss-animate plugin:
 * https://github.com/jamiebuilds/tailwindcss-animate
 */
const animation = withOptions<Partial<AnimationOptions>>(
  ({ staggerCount = 10, staggerAmount = 1 } = {}) =>
    ({ addUtilities, matchUtilities, theme }) => {
      addUtilities({
        "@keyframes enter": theme("keyframes.enter"),
        "@keyframes exit": theme("keyframes.exit"),
        [createClassName("animate", "in")]: {
          animationName: "enter",
          animationDuration: referenceVariable(
            VARIABLE_DURATION,
            theme("animationDuration.DEFAULT"),
          ),
          animationTimingFunction: referenceVariable(
            VARIABLE_TIMING_FUNCTION,
            theme("animationTimingFunction.DEFAULT"),
          ),
          animationDelay: referenceVariable(
            VARIABLE_DELAY,
            theme("animationDelay.DEFAULT"),
          ),
          animationPlayState: referenceVariable(VARIABLE_PLAY_STATE, "running"),
          [VARIABLE_ENTER_OPACITY]: "initial",
          [VARIABLE_ENTER_SCALE]: "initial",
          [VARIABLE_ENTER_ROTATE]: "initial",
          [VARIABLE_ENTER_TRANSLATE_X]: "initial",
          [VARIABLE_ENTER_TRANSLATE_Y]: "initial",
        },
        [createClassName("animate", "out")]: {
          animationName: "exit",
          animationDuration: referenceVariable(
            VARIABLE_DURATION,
            theme("animationDuration.DEFAULT"),
          ),
          animationTimingFunction: referenceVariable(
            VARIABLE_TIMING_FUNCTION,
            theme("animationDuration.DEFAULT"),
          ),
          animationDelay: referenceVariable(
            VARIABLE_DELAY,
            theme("animationDuration.DEFAULT"),
          ),
          [VARIABLE_EXIT_OPACITY]: "initial",
          [VARIABLE_EXIT_SCALE]: "initial",
          [VARIABLE_EXIT_ROTATE]: "initial",
          [VARIABLE_EXIT_TRANSLATE_X]: "initial",
          [VARIABLE_EXIT_TRANSLATE_Y]: "initial",
        },
      });

      matchUtilities(
        {
          "fade-in": (value) => ({ [VARIABLE_ENTER_OPACITY]: value }),
          "fade-out": (value) => ({ [VARIABLE_EXIT_OPACITY]: value }),
        },
        { values: theme("animationOpacity") },
      );

      matchUtilities(
        {
          "zoom-in": (value) => ({ [VARIABLE_ENTER_SCALE]: value }),
          "zoom-out": (value) => ({ [VARIABLE_EXIT_SCALE]: value }),
        },
        { values: theme("animationScale") },
      );

      matchUtilities(
        {
          "spin-in": (value) => ({ [VARIABLE_ENTER_ROTATE]: value }),
          "spin-out": (value) => ({ [VARIABLE_EXIT_ROTATE]: value }),
        },
        { values: theme("animationRotate") },
      );

      matchUtilities(
        ["left", "right", "top", "bottom"].reduce(
          (acc, direction) => {
            const enterVariableName = ["left", "right"].includes(direction)
              ? VARIABLE_ENTER_TRANSLATE_X
              : VARIABLE_ENTER_TRANSLATE_Y;

            const exitVariableName = ["left", "right"].includes(direction)
              ? VARIABLE_EXIT_TRANSLATE_X
              : VARIABLE_EXIT_TRANSLATE_Y;

            function getValue<T>(value: T) {
              return ["left", "top"].includes(direction) ? `-${value}` : value;
            }

            acc[createUtilityName("slide-in-from", direction)] = (value) =>
              ({ [enterVariableName]: getValue(value) }) as CSSRuleObject;

            acc[createUtilityName("slide-out-to", direction)] = (value) =>
              ({ [exitVariableName]: getValue(value) }) as CSSRuleObject;

            return acc;
          },
          {} as Parameters<typeof matchUtilities>[0],
        ),
        { values: theme("animationTranslate") },
      );

      matchUtilities(
        {
          duration: (value) => ({
            [VARIABLE_DURATION]: value,
            animationDuration: referenceVariable(VARIABLE_DURATION),
          }),
        },
        {
          values: filterDefault(theme("animationDuration") ?? {}),
        },
      );

      matchUtilities(
        {
          [createUtilityName("stagger")]: (value) => ({
            animationDuration: referenceVariable(VARIABLE_DURATION, "inherit"),
            animationTimingFunction: referenceVariable(
              VARIABLE_TIMING_FUNCTION,
              "inherit",
            ),
            animationPlayState: referenceVariable(
              VARIABLE_PLAY_STATE,
              "inherit",
            ),
            animationDelay: `calc(${referenceVariable(
              VARIABLE_DELAY,
              "inherit",
            )} * ${value})`,
          }),
        },
        {
          respectImportant: true,
          type: "number",
          values: new Array(staggerCount).fill(0).reduce((acc, _, i) => {
            acc[i + 1] = i * staggerAmount;
            return acc;
          }, {}),
        },
      );

      matchUtilities(
        {
          delay: (value) => ({
            [VARIABLE_DELAY]: value,
            animationDelay: referenceVariable(VARIABLE_DELAY),
          }),
        },
        { values: theme("animationDelay") },
      );

      matchUtilities(
        {
          ease: (value) => ({
            [VARIABLE_TIMING_FUNCTION]: value,
            animationTimingFunction: referenceVariable(
              VARIABLE_TIMING_FUNCTION,
            ),
          }),
        },
        { values: filterDefault(theme("animationTimingFunction") ?? {}) },
      );

      addUtilities({
        [createClassName("running")]: {
          [VARIABLE_PLAY_STATE]: "running",
          animationPlayState: referenceVariable(VARIABLE_PLAY_STATE),
        },
        [createClassName("paused")]: {
          [VARIABLE_PLAY_STATE]: "paused",
          animationPlayState: referenceVariable(VARIABLE_PLAY_STATE),
        },
      });

      matchUtilities(
        { "fill-mode": (value) => ({ animationFillMode: value }) },
        { values: theme("animationFillMode") },
      );

      matchUtilities(
        { direction: (value) => ({ animationDirection: value }) },
        { values: theme("animationDirection") },
      );

      matchUtilities(
        { repeat: (value) => ({ animationIterationCount: value }) },
        { values: theme("animationRepeat") },
      );
    },
  () => ({
    theme: {
      extend: {
        animationDelay: ({ theme }: PluginUtils) => ({
          ...theme("transitionDelay"),
        }),
        animationDuration: ({ theme }: PluginUtils) => ({
          0: "0ms",
          ...theme("transitionDuration"),
        }),
        animationTimingFunction: ({ theme }: PluginUtils) => ({
          ...theme("transitionTimingFunction"),
        }),
        animationFillMode: {
          none: "none",
          forwards: "forwards",
          backwards: "backwards",
          both: "both",
        },
        animationDirection: {
          normal: "normal",
          reverse: "reverse",
          alternate: "alternate",
          "alternate-reverse": "alternate-reverse",
        },
        animationOpacity: ({ theme }: PluginUtils) => ({
          DEFAULT: 0,
          ...theme("opacity"),
        }),
        animationTranslate: ({ theme }: PluginUtils) => ({
          DEFAULT: "100%",
          ...theme("translate"),
        }),
        animationScale: ({ theme }: PluginUtils) => ({
          DEFAULT: 0,
          ...theme("scale"),
        }),
        animationRotate: ({ theme }: PluginUtils) => ({
          DEFAULT: "30deg",
          ...theme("rotate"),
        }),
        animationRepeat: {
          0: "0",
          1: "1",
          infinite: "infinite",
        },
        keyframes: {
          enter: {
            from: {
              opacity: referenceVariable(VARIABLE_ENTER_OPACITY, 1),
              transform: [
                translate3D(
                  referenceVariable(VARIABLE_ENTER_TRANSLATE_X, 0),
                  referenceVariable(VARIABLE_ENTER_TRANSLATE_Y, 0),
                  "0",
                ),
                scale3D(
                  referenceVariable(VARIABLE_ENTER_SCALE, 1),
                  referenceVariable(VARIABLE_ENTER_SCALE, 1),
                  referenceVariable(VARIABLE_ENTER_SCALE, 1),
                ),
                rotate(referenceVariable(VARIABLE_ENTER_ROTATE, 0)),
              ].join(" "),
            },
          },
          exit: {
            to: {
              opacity: referenceVariable(VARIABLE_EXIT_OPACITY, 1),
              transform: [
                translate3D(
                  referenceVariable(VARIABLE_EXIT_TRANSLATE_X, 0),
                  referenceVariable(VARIABLE_EXIT_TRANSLATE_Y, 0),
                  "0",
                ),
                scale3D(
                  referenceVariable(VARIABLE_EXIT_SCALE, 1),
                  referenceVariable(VARIABLE_EXIT_SCALE, 1),
                  referenceVariable(VARIABLE_EXIT_SCALE, 1),
                ),
                rotate(referenceVariable(VARIABLE_EXIT_ROTATE, 0)),
              ].join(" "),
            },
          },
        },
      },
    },
  }),
);

export { animation };
