import { IUser } from '../../entity';
import { IPaginationResponse } from '../../interfaces';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getNewUsers(): Promise<IUser[]>;
    getUserPagination(searchObject: Partial<IUser>, limit: number, page: number): Promise<IPaginationResponse<IUser>>;
}
