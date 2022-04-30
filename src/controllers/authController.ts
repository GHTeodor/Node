import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entities/interfaces';
import { tokenRepository } from '../repositories';
import { constant, COOKIE, EmailActionEnum } from '../configs';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDB = await userService.getUserByEmail(email);

            if (userFromDB) throw new Error(`User with email: "${email}" already exists`);

            const createdUser = await userService.createUser(req.body);

            // UPLOAD PHOTO
            if (avatar) {
                const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);

                console.log('S3 Location:___________________________');
                console.log(sendData.Location);
                console.log('/S3 Location:___________________________');
            }

            // UPDATE USER

            const tokenData = await authService.registration(createdUser);
            res.cookie(
                COOKIE.nameRefreshToken,
                tokenData.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('Logout OK');
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(email, EmailActionEnum.WELCOME, { userName: 'NodeMailer' });

            await userService.compareUserPasswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get(constant.AUTHORIZATION);

            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { refreshToken, accessToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
