export default () => ({
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
  navigation: {
    enabled: true,
  }
});
