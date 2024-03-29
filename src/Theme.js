// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
import {COLOR_DARK, COLOR_DARKER, COLOR_LIGHT, COLOR_LIGHTER} from "./components/constants/Colors";

const config = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
    colors: {
    memento: {
      100: COLOR_LIGHTER,
      300: COLOR_LIGHT,
      600: COLOR_DARK,
      900: COLOR_DARKER,
    },
  }
}

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme(config)

export default theme
