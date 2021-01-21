module.exports = {
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
};
