import { DeleteResult, UpdateResult } from 'typeorm';

import commentRepository from '../repositories/comment/commentRepository';
import { IComment } from '../entities/interfaces/IComment';

class CommentService {
    public async getComments(): Promise<IComment[]> {
        return commentRepository.getComments();
    }

    public async getCommentById(id: string): Promise<IComment | undefined> {
        return commentRepository.getCommentById(id);
    }

    public async createComment(comment: IComment): Promise<IComment> {
        return commentRepository.createComment(comment);
    }

    public async updateComment(id: number, title: string, body: string): Promise<UpdateResult> {
        return commentRepository.updateComment(id, title, body);
    }

    public async deleteComment(id: number): Promise<DeleteResult> {
        return commentRepository.deleteComment(id);
    }
}

export default new CommentService();
