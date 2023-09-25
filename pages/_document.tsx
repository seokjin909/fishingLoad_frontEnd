import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script src='http://dmaps.daum.net/map_js_init/postcode.v2.js' />
        <Script
          	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=681e21469265b9cad0c0d6a6fe9739e2&libraries=services,clusterer&autoload=false"
          	strategy="beforeInteractive"
            type='text/javascript'
        	/>
          </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
