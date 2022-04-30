import { Router } from 'express';

import { teacherController } from '../controllers';

const router = Router();

router.get('/', teacherController.getTeachers);
router.post('/', teacherController.createTeacher);
router.patch('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacherById);

export const teacherRouter = router;
