import Joi from 'joi';

import { constant } from '../../configs';

export const emailValidator = Joi.string().regex(constant.EMAIL_REGEX);
