import { IUser } from '../entities/interfaces';
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces';

class AuthService {
    public async registration(createdUser: IUser): Promise<ITokenData> {
        return AuthService._getTokenData(createdUser);
    }

    private static async _getTokenData(userData: IUser): Promise<ITokenData> {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokensPair.refreshToken, tokensPair.accessToken);
        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
