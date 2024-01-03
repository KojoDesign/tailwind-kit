import { withOptions } from "tailwindcss/plugin";
import { CSSRuleObject } from "tailwindcss/types/config";

import {
  createClassName,
  createUtilityName,
  referenceVariable,
} from "../utils";
import {
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
  VARIABLE_GROUP_DELAY,
  VARIABLE_GROUP_DURATION,
  VARIABLE_GROUP_PLAY_STATE,
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
  ({ groupSteps = 10 } = {}) =>
    ({ addUtilities, matchUtilities, theme }) => {
      addUtilities({
        "@keyframes enter": theme("keyframes.enter"),
        "@keyframes exit": theme("keyframes.exit"),
        [createClassName("animate", "in")]: {
          animationName: "enter",
          animationDuration: theme("animationDuration.DEFAULT"),
          [VARIABLE_ENTER_OPACITY]: "initial",
          [VARIABLE_ENTER_SCALE]: "initial",
          [VARIABLE_ENTER_ROTATE]: "initial",
          [VARIABLE_ENTER_TRANSLATE_X]: "initial",
          [VARIABLE_ENTER_TRANSLATE_Y]: "initial",
        },
        [createClassName("animate", "out")]: {
          animationName: "exit",
          animationDuration: theme("animationDuration.DEFAULT"),
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
        ["l", "r", "t", "b"].reduce(
          (acc, direction) => {
            const enterVariableName = ["l", "r"].includes(direction)
              ? VARIABLE_ENTER_TRANSLATE_X
              : VARIABLE_ENTER_TRANSLATE_Y;

            const exitVariableName = ["l", "r"].includes(direction)
              ? VARIABLE_EXIT_TRANSLATE_X
              : VARIABLE_EXIT_TRANSLATE_Y;

            function getValue<T>(value: T) {
              return ["l", "t"].includes(direction) ? `-${value}` : value;
            }

            return {
              ...acc,
              [createUtilityName("slide-in-from", direction)]: (value) =>
                ({ [enterVariableName]: getValue(value) }) as CSSRuleObject,
              [createUtilityName("slide-out-to", direction)]: (value) =>
                ({ [exitVariableName]: getValue(value) }) as CSSRuleObject,
            };
          },
          {} as Parameters<typeof matchUtilities>[0],
        ),
        { values: theme("animationTranslate") },
      );

      matchUtilities(
        { duration: (value) => ({ animationDuration: value }) },
        { values: filterDefault(theme("animationDuration") ?? {}) },
      );

      addUtilities({
        [createClassName("animation", "group")]: {
          [VARIABLE_GROUP_DURATION]: theme("animationDuration.DEFAULT"),
          [VARIABLE_GROUP_DELAY]: theme("animationDelay.DEFAULT"),

          "&.running": {
            [VARIABLE_GROUP_PLAY_STATE]: "running",
          },
          "&.paused": {
            [VARIABLE_GROUP_PLAY_STATE]: "paused",
          },
        },
      });

      matchUtilities(
        {
          [createUtilityName("with", "delay")]: (value) => ({
            [VARIABLE_GROUP_DELAY]: value,
          }),
        },
        { values: theme("animationDelay") },
      );

      matchUtilities(
        {
          [createUtilityName("with", "duration")]: (value) => ({
            [VARIABLE_GROUP_DURATION]: value,
          }),
        },
        { values: theme("animationDuration") },
      );

      matchUtilities(
        {
          [createUtilityName("animation", "step")]: (value) => ({
            animationDuration: referenceVariable(VARIABLE_GROUP_DURATION),
            animationPlayState: referenceVariable(VARIABLE_GROUP_PLAY_STATE),
            animationDelay: `calc(${referenceVariable(
              VARIABLE_GROUP_DELAY,
            )} * ${value})`,
          }),
        },
        {
          respectImportant: true,
          values: new Array(groupSteps).fill(0).reduce(
            (acc, _, i) => ({
              ...acc,
              [i + 1]: i + 1,
            }),
            {},
          ),
        },
      );

      matchUtilities(
        {
          [createUtilityName("animation", "group")]: (value) => ({
            animationDuration: value,
          }),
        },
        { values: filterDefault(theme("animationDuration") ?? {}) },
      );

      matchUtilities(
        { delay: (value) => ({ animationDelay: value }) },
        { values: theme("animationDelay") },
      );

      matchUtilities(
        { ease: (value) => ({ animationTimingFunction: value }) },
        { values: filterDefault(theme("animationTimingFunction") ?? {}) },
      );

      addUtilities({
        [createClassName("running")]: { animationPlayState: "running" },
        [createClassName("paused")]: { animationPlayState: "paused" },
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
        animationDelay: ({ theme }: any) => ({
          ...theme("transitionDelay"),
        }),
        animationDuration: ({ theme }: any) => ({
          0: "0ms",
          ...theme("transitionDuration"),
        }),
        animationTimingFunction: ({ theme }: any) => ({
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
        animationOpacity: ({ theme }: any) => ({
          DEFAULT: 0,
          ...theme("opacity"),
        }),
        animationTranslate: ({ theme }: any) => ({
          DEFAULT: "100%",
          ...theme("translate"),
        }),
        animationScale: ({ theme }: any) => ({
          DEFAULT: 0,
          ...theme("scale"),
        }),
        animationRotate: ({ theme }: any) => ({
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
