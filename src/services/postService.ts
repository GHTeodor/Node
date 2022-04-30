import { DeleteResult, UpdateResult } from 'typeorm';

import { IPost } from '../entities/interfaces';
import { postRepository } from '../repositories';

class PostService {
    public async getPosts(): Promise<IPost[]> {
        return postRepository.getPosts();
    }

    public async getPostById(id: string): Promise<IPost | undefined> {
        return postRepository.getPostById(id);
    }

    public async createPost(post: IPost): Promise<IPost> {
        return postRepository.createPost(post);
    }

    public async updatePost(id: number, title: string, text: string): Promise<UpdateResult> {
        return postRepository.updatePost(id, title, text);
    }

    public async deletePost(id: number): Promise<DeleteResult> {
        return postRepository.deletePost(id);
    }
}

export const postService = new PostService();
