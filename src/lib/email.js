import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(email, subject, message) => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: subject,
            html: message
        });
    } catch (error) {
        console.log("Error while sending email", error);
        throw new Error("Error while sending email");
    }
}