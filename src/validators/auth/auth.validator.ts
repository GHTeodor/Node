import * as Joi from 'joi';

import { emailValidator } from '../common/email.validator';

export const authValidator = {
    login: Joi.object({
        email: emailValidator.message("Email isn't valid").trim(),
        // email: Joi.string().email().trim(),
        password: Joi.string().required().min(8).message("Password isn't valid")
            .trim(),
    }),
};
