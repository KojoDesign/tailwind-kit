/**
 * Most of the following implementation was taken from the Tailwind team
 * https://github.com/tailwindlabs/tailwindcss-typography/blob/master/jest/customMatchers
 */
import { diff } from "jest-diff";

import { CustomMatcher } from "../types";
import { DEFAULT_CSS } from "./constants";

interface CustomMatchers<R> {
  toMatchCSS: (expected: string) => string;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

// Compare two CSS strings with all whitespace removed
// This is probably naive but it's fast and works well enough.
export const toMatchCSS: CustomMatcher = function (received, argument) {
  function stripped(str: string) {
    return str?.replace(/\s/g, "").replace(/;/g, "");
  }

  const options = {
    comment: "stripped(received) === stripped(argument)",
    isNot: this.isNot,
    promise: this.promise,
  };

  const pass = stripped(received) === stripped(`${DEFAULT_CSS}\n${argument}`);

  const message = pass
    ? () => {
        return (
          this.utils.matcherHint("toMatchCSS", undefined, undefined, options) +
          "\n\n" +
          `Expected: not ${this.utils.printExpected(received)}\n` +
          `Received: ${this.utils.printReceived(argument)}`
        );
      }
    : () => {
        const actual = received;
        const expected = argument;

        const diffString = diff(expected, actual, {
          expand: this.expand,
        });
        console.log(expected, actual);
        return (
          this.utils.matcherHint("toMatchCSS", undefined, undefined, options) +
          "\n\n" +
          (diffString && diffString.includes("- Expect")
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n` +
              `Received: ${this.utils.printReceived(actual)}`)
        );
      };

  return { actual: received, message, pass };
};
