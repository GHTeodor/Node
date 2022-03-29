import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to SEP-2021',
        html: 'Hello this is welcome mail',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        html: 'Oops account was blocked',
    },
};
