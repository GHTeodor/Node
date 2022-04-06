import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories';
import { EmailActionEnum } from '../constants';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDb = await userService.getUserByEmail(email);

            if (userFromDb) throw new Error(`User with email: ${email} already exists`);

            const createdUser = await userService.createUser(req.body);

            if (avatar) await s3Service.uploadFile(avatar, 'user', createdUser.id); // UPLOAD PHOTO

            const tokenData = await authService.registration(createdUser);
            // res.cookie(
            //     'refreshToken',
            //     tokenData.refreshToken,
            //     { maxAge: 24 * 60 * 60 * 3600, httpOnly: true },
            // );

            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie('refreshToken');
        await tokenService.deleteUserTokenPair(id);
        return res.json('logout OK');
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(email, EmailActionEnum.WELCOME, { userName: 'G00GLE' });

            await userService.compareUserPasswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            // res.status(400).json(e);
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            // res.status(400).json(e);
            next(e);
        }
    }
}

export const authController = new AuthController();
