import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { IToken } from '../entity/token';
import { tokenRepository } from '../repositories/tokens/tokenRepository';
import { IUserPayload, ITokenPair } from '../interfaces/token.interface';

class TokenService {
    public async generateTokenPair(payload: IUserPayload):
        Promise<ITokenPair> {
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

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDB = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDB);
        }
        return tokenRepository.createToken({ refreshToken, userId });
    }
}

export const tokenService = new TokenService();
