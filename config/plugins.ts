export default ({ env }) => ({
  navigation: {
    enabled: true,
    graphql: { enabled: true },
  },
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
  upload: {
    config: {
        provider: "aws-s3",   
        providerOptions: {
            credentials: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
            },
            region: env("AWS_REGION"),
            params: {
                Bucket: env("AWS_BUCKET"),
                ACL: null
            },
        },
        breakpoints: {
            thumbnail: 156,
            small: 640,
            medium: 768,
            large: 1024,
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
  seo: {
    enabled: true,
  },
});
