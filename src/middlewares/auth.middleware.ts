import { Response, NextFunction } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';

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
        } catch ({ message }) {
            res.status(401).json({
                status: 401,
                message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) throw new Error('No token');

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });
            if (!tokenPairFromDB) throw new Error('Token is not valid');

            const userFromToken = await userService.getUserByEmail(userEmail);
            if (!userFromToken) throw new Error('Token is not valid');

            req.user = userFromToken;

            next();
        } catch ({ message }) {
            res.status(401).json({
                status: 401,
                message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
