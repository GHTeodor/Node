import { Response, NextFunction } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { authValidator } from '../validators';
import { ErrorHandler } from '../errors/errorHandler';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) throw new Error('No token');

            const { userEmail } = tokenService.verifyToken(refreshToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken && !tokenPairFromDB) throw new Error('Token is not valid');

            req.user = userFromToken;

            next();
        // } catch ({ message }) { res.status(401).json({ status: 401, message });
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });
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

        // } catch ({ message }) { res.status(401).json({ status: 401, message });
        } catch (e) {
            next(e);
        }
    }

    // VALIDATORS
    isLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
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
