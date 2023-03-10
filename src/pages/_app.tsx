import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weather-App</title>
        <meta name="description" content="Web app for weather" key="desc" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
