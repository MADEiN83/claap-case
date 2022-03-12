import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#202437",
    800: "#272D45",
    700: "#383C56",
  },
  primary: "#2C54EA",
  danger: "#EE748F",
  grey: {
    base: "#8C9DB5",
    700: "#DBE1E6",
  },
};

const theme = extendTheme({ colors });

export default theme;
