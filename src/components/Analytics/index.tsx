import Script from 'next/script';

export const Analytics = () => {
  return (
    <div className="container">
      &gt;!-- Global site tag (gtag.js) - Google Analytics --&gt;
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID});
        `}
      </Script>
    </div>
  );
};
