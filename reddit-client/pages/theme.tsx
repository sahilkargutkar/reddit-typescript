import { theme as chakraTheme } from "@chakra-ui/react";

const fonts = { ...chakraTheme.fonts, mono: `'Menlo',monospace` };

const breakpoints = ["40em", "52em", "64em"];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
  },
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path />
        </svg>
      ),
      viewbox: "0 0 3000 3163 ",
    },
  },
};

export default theme;
