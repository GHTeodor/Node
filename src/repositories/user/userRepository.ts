import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser } from '../../entities/interfaces';
import { User } from '../../entities';
import { IUserRepository } from './IUserRepository';
import { IPaginationResponseInterface } from '../../interfaces';

dayjs.extend(utc);

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

    public async getNewUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', {
                date: dayjs().utc().startOf('day').format(),
            })
            .getMany();
    }

    public async getUserPagination(searchObject: Partial<IUser>, limit: number, page: number = 1)
        : Promise<IPaginationResponseInterface<IUser>> {
        const skip = limit * (page - 1);
        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
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

export const userRepository = new UserRepository();
