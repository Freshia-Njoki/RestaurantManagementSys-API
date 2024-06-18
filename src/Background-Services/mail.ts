import nodemailer from 'nodemailer';
import 'dotenv/config';

export const mailFunction = (to: string, subject: string, text:string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.GMAIL_PWD
        }
    })
    const mailOptions = {from: process.env.EMAIL, to, subject, text}

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        }else {
            console.log(`Email sent: ${info.response}`);
        }
    })
}