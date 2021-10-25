import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    gray: {
      50: "#edf2fc",
      100: "#d3d9e0",
      200: "#b9bfc6",
      300: "#9ea6ae",
      400: "#828c96",
      500: "#69737d",
      600: "#515961",
      700: "#394046",
      800: "#20262c",
      900: "#010f14",
    },
    yellow: {
      50: "#fff9da",
      100: "#ffecad",
      200: "#ffdf7d",
      300: "#ffd24b",
      400: "#ffc61a",
      500: "#e6ac00",
      600: "#b38600",
      700: "#806000",
      800: "#4e3900",
      900: "#1d1300",
    },
    purple: {
      50: "#f2e5ff",
      100: "#d2b5ff",
      200: "#b285fa",
      300: "#9356f7",
      400: "#7425f3",
      500: "#5a0cda",
      600: "#4608aa",
      700: "#32057b",
      800: "#1e024c",
      900: "#0c001e",
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Rubik",
    body: "Rubik",
  },
})

export default theme
