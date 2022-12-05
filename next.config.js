/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
images: { domains: ['api.tween-blog.online'] },
  
webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vars': path.resolve(__dirname, 'src/styles/global/vars')
    };

   
 return config;
  }
};
