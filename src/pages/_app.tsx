// 1. Imports
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../core/store';
import Head from 'next/head';

import Layout from '@/layout/Layout';

import 'styles/global/main.scss';

// 2. Component
const MyApp = ({ Component, pageProps }: AppProps) => {   
    return (
        <Provider store={store}>
            <Layout> 
                <Head>
                    <title>Социальная сеть Tween!</title>
                </Head>   
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

// 3. Export
export default MyApp;