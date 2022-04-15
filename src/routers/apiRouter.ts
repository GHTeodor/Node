import { Router } from 'express';

import { studentRouter } from './studentRouter';

const router = Router();

router.use('/students', studentRouter);

export const apiRouter = router;
