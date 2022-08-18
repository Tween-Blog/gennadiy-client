import { Html, Head, Main, NextScript } from 'next/document'

import config from '../config';

const Document = () => {
    return (
        <Html>
            <Head>
                {/* Charset */}
                <meta charSet="UTF-8" />
                {/* Responsive */}
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                {/* SEO Tags */}
                <meta name="description" 
                    content="В нашем приложении ты cможешь поделиться 
                    информацией о себе, и своей жизни, вместе с другими 
                    пользователями в режиме реального времени. Быстро, просто и легко!" 
                />
                <meta name="keywords" 
                    content="Tween, блог, знакомства, посты, публикации, комментарии, чат,
                     социальная сеть, лайки, дизлайки, подписчики, подписки." 
                    />
                {/* Styling */}
                <meta name="theme-color" content="#AF48F4" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                {/* OG Tags */}
                <meta property="og:title" content="Начни свой блог в Tween!" />
                <meta property="og:description" 
                    content="В нашем приложении ты cможешь поделиться информацией о себе,
                     и своей жизни, вместе с другими пользователями в режиме реального времени. 
                     Быстро, просто и легко!" 
                    />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={config.PREVIEW_URL} />
                <meta property="og:site_name" content="Tween" />
                {/* Fonts */}
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" 
                        rel="stylesheet" 
                    />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default Document;