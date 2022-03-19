import { Response, NextFunction } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const authToken = req.get('Authorization');

            if (!authToken) throw new Error('No token');

            const { userEmail } = tokenService.verifyToken(authToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) throw new Error('Wrong token');

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
