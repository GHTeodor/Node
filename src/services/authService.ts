import { userService } from './userService';
import { IUser } from '../entity/user';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(body: IUser) {
        const { email } = body;

        const userFromDB = await userService.getUserByEmail(email);
        if (userFromDB) throw new Error(`User with email: ${email} is already exist`);
        const createdUser = await userService.createUser(body);

        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser) {
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokensPair.refreshToken);

        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
