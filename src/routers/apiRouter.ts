import { Router } from 'express';

import {
    userRouter, postRouter, commentRouter, authRouter, studentRouter, teacherRouter,
} from '.';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);

router.use('/students', studentRouter); // MongoDB
router.use('/teachers', teacherRouter); // MongoDB

export const apiRouter = router;
