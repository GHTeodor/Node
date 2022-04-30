import { DeleteResult, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entities/interfaces';
import { userRepository } from '../repositories';
import { IPaginationResponseInterface } from '../interfaces';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getUserPagination(filterObject: any, page: number, perPage: number): Promise<IPaginationResponseInterface<IUser>> {
        return userRepository.getUserPagination({ email: 'pagination@gmail.com' }, perPage, page);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) throw new Error('User not exists');
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await UserService._hashPassword(password);
        const createdUser = { ...user, password: hashedPassword };
        return userRepository.createUser(createdUser);
    }

    public async updateUser(id: number, email: string, password: string): Promise<UpdateResult> {
        return userRepository.updateUser(id, email, password);
    }

    public async deleteUser(id: number): Promise<DeleteResult> {
        return userRepository.deleteUser(id);
    }

    private static async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
