import { Joi, Segments } from 'celebrate';

import { emailValidator } from '../common/email.validator';

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object({
            email: emailValidator.message('Email not valid'),
            // email: Joi.string().email(),
            password: Joi.string().required().min(8),
        }),
    },
};
