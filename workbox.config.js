
module.exports = {
  swDest: `../service-worker.js`,
  // chunks: ['main', 'lazyload'],
  clientsClaim: true,
  skipWaiting: true,
  exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/],
  runtimeCaching: [
    // logic to cache assets
    {
      // routing for images and fonts that can be cached
      urlPattern: /public\/dist\/images\/.*\.(jpg|svg|png|ttf|woff|woff2|eot)/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-fonts',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 10,
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      // routing for js chunks
      urlPattern: /public\/dist\/js\/.*chunk\.js/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'js-chunks',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60,
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      // routing for css
      urlPattern: /public\/dist\/css\/.*\.css/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'css',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 15,
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};
