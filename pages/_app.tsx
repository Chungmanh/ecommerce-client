import '../styles/globals.css';
import * as React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          {/* <Component {...pageProps} /> */}
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
