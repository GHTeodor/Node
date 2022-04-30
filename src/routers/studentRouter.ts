import { Router } from 'express';

import { studentController } from '../controllers';

const router = Router();

router.get('/', studentController.getStudents);
router.post('/', studentController.createStudent);
router.patch('/:id', studentController.updateStudentById);
router.delete('/:id', studentController.deleteStudentById);

export const studentRouter = router;
