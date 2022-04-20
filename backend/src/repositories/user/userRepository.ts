import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser } from '../../entities/interfaces/IUser';
import { User } from '../../entities/user';
import { IUserRepository } from './IUserRepository';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts'] });
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(id: number, email: string, password: string): Promise<UpdateResult> {
        return getManager().getRepository(User).update({ id }, { email, password });
    }

    public async deleteUser(id: number): Promise<DeleteResult> {
        return getManager().getRepository(User).delete({ id });
    }
}

export default new UserRepository();
