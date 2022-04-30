import { Request } from 'express';

import { IUser } from '../entities/interfaces';

export interface IRequestExtended extends Request {
    user?: IUser;
}
