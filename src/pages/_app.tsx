import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { ItemsProvider } from '@/context/ItemsProvider';
import { theme } from '@/styles';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      theme={{
        ...theme,
      }}
    >
      <ItemsProvider>
        <Component {...pageProps} />
      </ItemsProvider>
    </ChakraProvider>
  );
}
