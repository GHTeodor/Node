import jwt from 'jsonwebtoken';

import { config } from '../configs/config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositories';
import { IUserPayload, ITokenPair } from '../interfaces';

class TokenService {
    public generateTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: '15m' },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: '1d' },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string, accessToken: string): Promise<IToken> {
        const tokenFromDB = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            tokenFromDB.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDB);
        }
        return tokenRepository.createToken({ accessToken, refreshToken, userId });
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') secretWord = config.SECRET_REFRESH_KEY;

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
