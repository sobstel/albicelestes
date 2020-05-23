module.exports = {
  experimental: {
    async redirects() {
      return [
        {
          source: "/matches/:year/:slug/:id",
          destination: "/matches/:year/:slug",
          permanent: true,
        },
        {
          source: "/players/:catalog/:slug/:id",
          destination: "/players/:catalog/:slug",
          permanent: true,
        },
      ];
    },
  },
};
