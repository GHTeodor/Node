import { Response, Request } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import postService from '../services/postService';
import { IPost } from '../entities/interfaces/IPost';

class PostController {
    public async getPosts(req: Request, res: Response): Promise<any> {
        const posts = await postService.getPosts();
        return res.render('posts', { posts });
    }

    public async getPostById(req: Request, res: Response): Promise<Response<IPost>> {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        return res.json(post);
    }

    public async createPost(req: Request, res: Response): Promise<Response<IPost>> {
        const createdPost = await postService.createPost(req.body);
        return res.json(createdPost);
    }

    public async updatePost(req: Request, res: Response): Promise<Response<UpdateResult>> {
        const { title, text } = req.body;
        const { id } = req.params;
        const updatedPost = await postService.updatePost(+id, title, text);
        return res.json(updatedPost);
    }

    public async deletePost(req: Request, res: Response): Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const deletedPost = await postService.deletePost(+id);
        return res.json(deletedPost);
    }
}

export default new PostController();
