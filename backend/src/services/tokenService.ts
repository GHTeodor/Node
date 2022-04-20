import jwt from 'jsonwebtoken';

import { config } from '../configs/config';
import { IToken } from '../entities/interfaces/IToken';
import tokenRepository from '../repositories/token/tokenRepository';

class TokenService {
    public async generateTokenPair(payload: any)
        : Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });
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
        const token = await tokenRepository.createToken({ refreshToken, userId });
        return token;
    }
}

export default new TokenService();
