import { ThemeProvider } from "@emotion/react";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "../styles/globals.css";
import { Provider, createClient } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider value={client}>
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <Component {...pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
