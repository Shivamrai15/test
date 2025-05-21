import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, message }) => {
  try {
    await resend.emails.send({
      from: 'no-reply@emails.shivamrai.online',
      to,
      subject,
      html: message
    });
  } catch (error) {
    console.log('Error while sending email', error);
    throw new Error('Error while sending email');
  }
};
