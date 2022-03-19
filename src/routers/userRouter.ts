import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);

export const userRouter = router;
