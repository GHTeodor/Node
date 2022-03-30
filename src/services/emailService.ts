import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../configs/config';
import { EmailActionEnum, emailInfo } from '../constants';

class EmailService {
    async sendMail(userMail: string, action: EmailActionEnum, context = {}): Promise<SentMessageInfo> {
        const rootDir = path.join(__dirname, '../');

        const templateRenderer = new EmailTemplate({
            views: {
                root: path.join(rootDir, 'email-templates'),
            },
        });

        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: 'https://google.com' });

        const html = await templateRenderer.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep-2021',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
