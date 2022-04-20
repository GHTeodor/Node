import {
    DeleteResult, EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IComment } from '../../entities/interfaces/IComment';
import { ICommentRepository } from './ICommentRepository';
import { Comment } from '../../entities/comment';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getComments(): Promise<IComment[]> {
        return getManager().getRepository(Comment).find();
    }

    public async getCommentById(id: string): Promise<IComment | undefined> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .andWhere('comment.deletedAt IS NULL')
            .getOne();
    }

    public async createComment(comment: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async updateComment(id: number, title: string, body: string): Promise<UpdateResult> {
        return getManager().getRepository(Comment).update({ id }, { title, body });
    }

    public async deleteComment(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Comment).delete({ id });
    }
}

export default new CommentRepository();
