import { IComment } from './IComment';

export interface IPost {
    title: string;
    text: string;
    userId: number;
    comments?: IComment[];
}
