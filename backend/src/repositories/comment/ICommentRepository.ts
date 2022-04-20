import { DeleteResult, UpdateResult } from 'typeorm';

import { IComment } from '../../entities/interfaces/IComment';

export interface ICommentRepository {
    getComments(): Promise<IComment[]>;
    getCommentById(id: string): Promise<IComment | undefined>;
    createComment(comment: IComment): Promise<IComment>;
    updateComment(id: number, title: string, body: string): Promise<UpdateResult>;
    deleteComment(id: number): Promise<DeleteResult>;
}
