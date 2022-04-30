import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { Post } from '../../entities';
import { IPost } from '../../entities/interfaces';
import { IPostRepository } from './IPostRepository';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async getPosts(): Promise<IPost[]> {
        return getManager().getRepository(Post).find({ relations: ['comments'] });
    }

    public async getPostById(id: string): Promise<IPost | undefined> {
        return getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .andWhere('post.deletedAt IS NULL')
            .getOne();
    }

    public async createPost(post: IPost): Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async updatePost(id: number, title: string, text: string): Promise<UpdateResult> {
        return getManager().getRepository(Post).update({ id }, { title, text });
    }

    public async deletePost(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Post).delete({ id });
    }
}

export const postRepository = new PostRepository();
