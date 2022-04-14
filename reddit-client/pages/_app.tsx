import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import "../styles/globals.css";
import theme from "./theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
