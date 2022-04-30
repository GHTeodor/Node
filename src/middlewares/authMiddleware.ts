import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { tokenService, userService } from '../services';
import { tokenRepository } from '../repositories';
import { constant } from '../configs';
import { authValidator } from '../validators';
import { ErrorHandler } from '../errors/errorHandler';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constant.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch ({ message }) {
            res.status(401).json({
                status: 401,
                message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constant.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch ({ message }) {
            res.status(401).json({
                status: 401,
                message,
            });
        }
    }

    // VALIDATION
    public isBodyForLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
