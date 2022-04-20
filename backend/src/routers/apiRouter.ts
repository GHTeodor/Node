import { Router } from 'express';

import {
    userRouter, postRouter, commentRouter, authRouter,
} from './index';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);

export const apiRouter = router;
