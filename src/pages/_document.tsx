/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document';

import { Tags } from '@/components/Tags';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <Tags />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
