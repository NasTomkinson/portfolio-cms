const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export default {
  async create(ctx) {
    const body = ctx.request.body ?? {};
    const data = {
      name: clean(body.name, 120),
      email: clean(body.email, 254).toLowerCase(),
      phone: clean(body.phone, 40),
      organisation: clean(body.organisation, 120),
      message: clean(body.message, 5000),
      source: clean(body.source, 255),
      status: 'new' as const,
    };

    if (!data.name || !EMAIL_PATTERN.test(data.email) || !data.message) {
      return ctx.badRequest('Name, a valid email address, and a message are required.');
    }

    await strapi.documents('api::contact-submission.contact-submission').create({ data });

    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;
    if (notificationEmail) {
      try {
        const organisation = data.organisation ? `\nCompany: ${data.organisation}` : '';
        const phone = data.phone ? `\nPhone: ${data.phone}` : '';
        await strapi.plugin('email').service('email').send({
          to: notificationEmail,
          replyTo: data.email,
          subject: `Portfolio enquiry from ${data.name.replace(/[\r\n]/g, ' ')}`,
          text: `Name: ${data.name}\nEmail: ${data.email}${phone}${organisation}\n\n${data.message}`,
        });
      } catch (error) {
        strapi.log.error('Contact submission saved, but notification email failed.', error);
      }
    }

    ctx.status = 201;
    ctx.body = { data: { received: true } };
  },
};
