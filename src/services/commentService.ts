import { DeleteResult, UpdateResult } from 'typeorm';

import { IComment } from '../entities/interfaces';
import { commentRepository } from '../repositories';

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

export const commentService = new CommentService();
