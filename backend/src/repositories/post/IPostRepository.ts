import { DeleteResult, UpdateResult } from 'typeorm';

import { IPost } from '../../entities/interfaces/IPost';

export interface IPostRepository {
    getPosts(): Promise<IPost[]>;
    getPostById(id: string): Promise<IPost | undefined>;
    createPost(post: IPost): Promise<IPost>;
    updatePost(id: number, title: string, text: string): Promise<UpdateResult>;
    deletePost(id: number): Promise<DeleteResult>;
}
