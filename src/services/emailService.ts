import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config, EmailActionEnum, emailInfo } from '../configs';

class EmailService {
    templateRenderer = new EmailTemplate({
        views: {
            root: path.join(__dirname, '../', 'email-templates'),
        },
    });

    async sendMail(userMail: string, action: EmailActionEnum, context: {} = {}): Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: 'https://google.com' });

        const html = await this.templateRenderer.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'Nodemailer No Reply Sep-2021',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
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
