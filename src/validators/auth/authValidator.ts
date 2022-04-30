import * as Joi from 'joi';

import { emailValidator } from '../common/emailValidator';

export const authValidator = {
    login: Joi.object({
        // email: Joi.string().email().message('Email is not valid'),
        email: emailValidator.message('Email is not valid').trim(),
        password: Joi.string().required().min(8).message('Password is not valid').trim(),
    }),
};
