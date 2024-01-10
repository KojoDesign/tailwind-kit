import plugin from "tailwindcss/plugin";

const shorthand = plugin(({ addUtilities, addVariant }) => {
  addVariant("psuedo", ["&:before", "&:after"]);
  addUtilities({
    centered: {
      "&.absolute": {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      "&.fixed": {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      "&.flex": {
        alignItems: "center",
        justifyContent: "center",
      },
    },
  });
});

export { shorthand };
