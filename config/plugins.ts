export default ({ env }) => ({
  navigation: {
    enabled: true,
    graphql: { enabled: true },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("EMAIL_HOST", "nastomkinson.com"),
        port: env.int("EMAIL_PORT", 465),
        secure: env.bool("EMAIL_SECURE", true),
        auth: {
          user: env("EMAIL_USER", "hello@nastomkinson.com"),
          pass: env("EMAIL_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("EMAIL_FROM", "hello@nastomkinson.com"),
        defaultReplyTo: env("EMAIL_REPLY_TO", "hello@nastomkinson.com"),
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
