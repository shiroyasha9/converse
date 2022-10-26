import '../styles/globals.css';

import { AppType } from 'next/app';

import SocketsProvider from '../context/socketContext';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
};

export default MyApp;
