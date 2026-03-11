import nodemailer from 'nodemailer';

const emailHost = process.env.EMAIL_SERVER_HOST;
const emailPort = process.env.EMAIL_SERVER_PORT;
const emailUser = process.env.EMAIL_SERVER_USER;
const emailPassword = process.env.EMAIL_SERVER_PASSWORD;
const emailFrom = process.env.EMAIL_FROM;

export let transporter: nodemailer.Transporter;

if (process.env.ENVIRONMENT === 'production') {
    transporter = nodemailer.createTransport({
        host: emailHost,
        port: 465,
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPassword,
        },
    });
} else {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPassword,
        },
    });
}

export const mailOptions = {
    from: emailFrom,
};
