/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
images: { domains: ['tween-api.herokuapp.com'] },
  
webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vars': path.resolve(__dirname, 'src/styles/global/vars')
    };

   
 return config;
  }
};