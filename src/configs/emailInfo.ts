import { EmailActionEnum } from './enum';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to SEP-2021',
        templateName: 'welcome',
    },

    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        templateName: 'accountBlocked',
    },
};
