import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

// eslint-disable-next-line import/extensions
import * as docs from '../docs/swagger.json';
import {
    userRouter, postRouter, commentRouter, authRouter, studentRouter, teacherRouter,
} from '.';

const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);

router.use('/students', studentRouter); // MongoDB
router.use('/teachers', teacherRouter); // MongoDB

export const apiRouter = router;
