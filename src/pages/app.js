// app.js or _app.js
import React from 'react';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true, // optional: respect system preference on first load
};

const theme = extendTheme({ config });

function App({ Component, pageProps }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {/* <Component {...pageProps} /> */}
      </ChakraProvider>
    </>
  );
}

export default App;
