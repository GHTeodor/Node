import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../../entities/interfaces/IUser';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: number, email: string, password: string): Promise<UpdateResult>;
    deleteUser(id: number): Promise<DeleteResult>;
}
