import '../styles/index.css';

import { useAtomValue } from 'jotai';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { usernameAtom } from '../stores/user';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const username = useAtomValue(usernameAtom);

  useEffect(() => {
    if (username !== null) {
      setIsLoading(false);
    }
  }, [username]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Converse</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
