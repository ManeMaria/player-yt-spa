/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="uf-8" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        {/* <meta property="og:url" content="" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Top 100 músicas sertanejas" />
        <meta
          property="og:description"
          content="Ouça agora as Top 100 músicas sertanejas mais tocadas de 2023."
        />
        <meta property="og:image" content="../assets/images/festival_widexl.webp" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content="Top 100 músicas sertanejas" />
        <meta
          name="twitter:description"
          content="Ouça agora as Top 100 músicas sertanejas mais tocadas de 2023."
        />
        <meta name="twitter:image" content="../assets/images/festival_widexl.webp" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
