import { DeleteResult, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entities/interfaces/IUser';
import userRepository from '../repositories/user/userRepository';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
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

export default new UserService();
