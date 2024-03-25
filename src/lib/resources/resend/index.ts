import { Resend } from "resend";
const resend = new Resend('re_FzdTiYiM_N2nWBzoHBY2JsteW4t5adUw7');

export const sendMail = async (to: string, subject: string, content: string) => resend.emails.send({
    from: 'Cyclo <noreply@cyclo.dev>',
    to: [to],
    subject,
    html: content,
});

export default {
  sendMail,
};