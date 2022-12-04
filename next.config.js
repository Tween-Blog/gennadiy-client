/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
images: { domains: ['express-api-production-2f1f.up.railway.app'] },
  
webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vars': path.resolve(__dirname, 'src/styles/global/vars')
    };

   
 return config;
  }
};