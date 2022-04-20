import { Router } from 'express';

import commentController from '../controllers/commentController';

const router = Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export const commentRouter = router;
