/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules');
const { withContentlayer } = require('next-contentlayer');
const path = require('path');

const SECURE_CONTENT_DOMAINS = [
    'img.youtube.com',
    'avatars.githubusercontent.com',
    'github.com',
    'avatars0.githubusercontent.com',
    'avatars1.githubusercontent.com',
    'avatars2.githubusercontent.com',
    'avatars3.githubusercontent.com',
    'res.cloudinary.com',
];

const TRANSPILE_MODULES = [
    '@storency-ui/components',
    '@storency-ui/hooks',
    '@storency-ui/utils',
    '@storency-ui/constants',
    '@storency-ui/types',
];

const NEXT_CONFIG = {
    compress: true,
    poweredByHeader: false,
    optimizeFonts: true,
    reactStrictMode: true,
    swcMinify: true,
    productionBrowserSourceMaps: true,
    // TODO: maybe enable
    // experimental: {
    //     optimizeCss: true,
    // },
    images: {
        domains: SECURE_CONTENT_DOMAINS,
    },
    redirects: require('./next-redirect'),
    sassOptions: {
        includePaths: [path.join(__dirname, './styles')],
    },
};

const PLUGINS = [withTM(TRANSPILE_MODULES), withContentlayer];

module.exports = () => PLUGINS.reduce((acc, next) => next(acc), NEXT_CONFIG);
