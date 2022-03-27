import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.get('/', userController.getUsers);
router.patch('/:id', userController.patchUser_Email_Password);
router.delete('/:id', userController.deleteUserById);
router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);

export const userRouter = router;
