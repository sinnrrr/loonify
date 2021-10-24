const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")
const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  basePath: "/office",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/office",
  //       permanent: false,
  //     },
  //   ]
  // },
})
