import { Router } from 'express';

import postController from '../controllers/postController';

const router = Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export const postRouter = router;
