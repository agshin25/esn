import config from "../config";
import nodemailer from "nodemailer";

type MailOptions = {
  email: string;
  subject: string;
  template: string;
};

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: 587,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
});

export const sendMail = async ({ email, subject, template }: MailOptions) => {
  return await transporter.sendMail({
    from: config.senderMail,
    to: `${email.split("@")[0]} <${email}>`,
    subject,
    html: template,
  });
};

/* TEMPLATES */
export const WELCOME_TEMPLATE = `<p>[TEXT]</p>`;
