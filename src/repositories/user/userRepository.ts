import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, User } from '../../entity/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async getUserByEmail(email: string):Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }
}

export const userRepository = new UserRepository();
