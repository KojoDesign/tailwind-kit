import plugin from "tailwindcss/plugin";

import { createClassName } from "../utils";

const shorthand = plugin(({ addUtilities, addVariant }) => {
  addVariant("psuedo", ["&:before", "&:after"]);

  addUtilities({
    [createClassName("center")]: {
      "&.absolute, &.fixed": {
        "@apply top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]": "",
      },
      "&.flex": {
        "@apply justify-center items-center": "",
      },
    },
  });
});

export { shorthand };
