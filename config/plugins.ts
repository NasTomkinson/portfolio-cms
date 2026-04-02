export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "nastomkinson.com",
        port: 465,
        secure: true,
        auth: {
          user: "hello@nastomkinson.com",
          pass: "$aAb499040CD",
        },
      },
      settings: {
        defaultFrom: "hello@nastomkinson.com",
        defaultReplyTo: "hello@nastomkinson.com",
      },
    },
  },
  graphql: {
    config: {
      landingPage: env.bool("GRAPHQL_LANDING_PAGE", true),
      apolloServer: {
        introspection: env.bool("GRAPHQL_INTROSPECTION", true),
      },
    },
  },
  navigation: {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
  upload: {
    config: {
      provider: 'uploads',
      providerOptions: {
        sizeLimit: 100000,
      },
    },
  },
});
