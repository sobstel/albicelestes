const { RelativeCiAgentWebpackPlugin } = require("@relative-ci/agent");

module.exports = {
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: "/matches",
        destination: "/",
        permanent: true,
      },
      {
        source: "/matches/:year",
        destination: "/:year",
        permanent: true,
      },
      {
        source: "/matches/:year/:slug",
        destination: "/:year/:slug",
        permanent: true,
      },
      {
        source: "/matches/:year/:slug/:id",
        destination: "/:year/:slug",
        permanent: true,
      },
      {
        source: "/players/:catalog/:slug/:id",
        destination: "/players/:catalog/:slug",
        permanent: true,
      },
    ];
  },
  webpack: function (config, options) {
    const { dev, isServer } = options;

    if (!dev && !isServer) {
      config.plugins.push(new RelativeCiAgentWebpackPlugin());
    }

    return config;
  },
};
