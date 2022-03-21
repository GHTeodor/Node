import { Response, NextFunction } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) throw new Error('No token');

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken && !tokenPairFromDB) throw new Error('Token is not valid');

            req.user = userFromToken;

            next();
        } catch ({ message }) {
            res.json({
                status: 400,
                message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
