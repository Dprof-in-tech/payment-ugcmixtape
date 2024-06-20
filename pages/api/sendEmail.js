import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config(); // Load environment variables

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

const sendMail = async (from, to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_MAIL_HOST,
            port: process.env.NEXT_PUBLIC_MAIL_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NEXT_MAIL_USERNAME,
                pass: process.env.NEXT_MAIL_PASSWORD
            },
            tls: {
                // This prevents "Hostname/IP does not match certificate's altnames" error
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html
        };

        return transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error('Error in sendMail function:', error);
        throw error;
    }
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { from, to, subject, html } = req.body;

        try {
            await sendMail(from, to, subject, html);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            logger.error('Error in API handler:', error);
            res.status(500).json({ error: 'Failed to send email', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
