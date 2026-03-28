import type { Core } from "@strapi/strapi";

export default {
  async afterCreate(event) {
    const { result } = event;

    // Example fields from your content type
    const { firstName, lastName, emailAddress, companyName, message } = result;

    // Send email
    await strapi
      .plugin("email")
      .service("email")
      .send({
        to: ["hello@nastomkinson.com", "nastomkinson@gmail.com"], // your inbox
        subject: `New form submission from ${firstName}`,
        text: `
          A new form submission was received: \n
          Name: ${firstName} ${lastName} \n
          Email: ${emailAddress} \n
          CompanyName: ${companyName} \n
          Message: ${message} \n
        `,
      });
  },
};
