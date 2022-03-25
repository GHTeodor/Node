import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { ErrorHandler } from '../errors/errorHandler';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                // res.status(400).json('User not found');
                next(new ErrorHandler('User not found', 404));
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            // res.status(400).json(e);
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
