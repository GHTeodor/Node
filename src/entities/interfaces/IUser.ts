import { IPost } from './IPost';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
    posts?: IPost[];
}
