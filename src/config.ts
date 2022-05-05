const DEVELOPMENT_NEXT_API_URL: string = 'http://localhost:3000/api';
const PRODUCTION_NEXT_API_URL: string = 'https://tween-client-gennadiy.vercel.app/api';

const EXPRESS_URL: string = 'https://tween-api.herokuapp.com';

const config =  {
    EXPRESS_API_URL: `${EXPRESS_URL}/api`,
    NEXT_API_URL: process.env.NODE_ENV === 'production' ? PRODUCTION_NEXT_API_URL : DEVELOPMENT_NEXT_API_URL,
    PREVIEW_URL: `${EXPRESS_URL}/preview.png`
}

export default config;