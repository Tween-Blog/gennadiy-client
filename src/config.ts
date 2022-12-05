const DEVELOPMENT_NEXT_API_URL: string = 'http://localhost:3000/api';
const PRODUCTION_NEXT_API_URL: string = 'https://www.tween-blog.online/api';

const EXPRESS_URL: string = 'https://api.tween-blog.online';

const config =  {
    EXPRESS_API_URL: `${EXPRESS_URL}`,
    NEXT_API_URL: process.env.NODE_ENV === 'production' ? PRODUCTION_NEXT_API_URL : DEVELOPMENT_NEXT_API_URL,
    PREVIEW_URL: `${EXPRESS_URL}/preview.png`,
    AVATARS_URL: `${EXPRESS_URL}/avatars/`,
    POSTS_URL: `${EXPRESS_URL}/posts/`
}

export default config;
