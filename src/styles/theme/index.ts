import { extendTheme } from '@chakra-ui/react';
import foundations from './foundations';
import { styles } from './chakra-styles';



export default extendTheme({
  styles,
  ...foundations,
  fonts: {
    heading: `"Poppins", sans-serif, Nunito Sans, Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,

  },
})