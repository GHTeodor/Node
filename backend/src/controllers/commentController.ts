import { Response, Request } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import commentService from '../services/commentService';
import { IComment } from '../entities/interfaces/IComment';

class CommentController {
    public async getComments(req: Request, res: Response): Promise<any> {
        const comments = await commentService.getComments();
        return res.render('comments', { comments });
    }

    public async getCommentById(req: Request, res: Response): Promise<Response<IComment>> {
        const { id } = req.params;
        const comment = await commentService.getCommentById(id);
        return res.json(comment);
    }

    public async createComment(req: Request, res: Response): Promise<Response<IComment>> {
        const createdComment = await commentService.createComment(req.body);
        return res.json(createdComment);
    }

    public async updateComment(req: Request, res: Response): Promise<Response<UpdateResult>> {
        const { title, body } = req.body;
        const { id } = req.params;
        const updatedComment = await commentService.updateComment(+id, title, body);
        return res.json(updatedComment);
    }

    public async deleteComment(req: Request, res: Response): Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const deletedComment = await commentService.deleteComment(+id);
        return res.json(deletedComment);
    }
}

export default new CommentController();
