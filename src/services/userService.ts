import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositories';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getUserPagination(filterObject: Partial<IUser>, page: number, perPage: number) {
        return userRepository.getUserPagination(filterObject, perPage, page);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<Error | void> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) throw new Error('User is not exist');
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
