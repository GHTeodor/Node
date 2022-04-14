import { Router } from 'express';

import { studentModel } from '../models';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const createdStudent = await studentModel.create(req.body);
        res.json(createdStudent);
    } catch (e) {
        next(e);
    }
});
router.get('/', async (req, res, next) => {
    try {
        const students = await studentModel.find({}).populate(['teacher']);
        // await teacherModel.create({
        //     name: 'T',
        //     age: 25,
        //     email: 'A1@i.ua',
        // });

        res.json(students);
    } catch (e) {
        next(e);
    }
});

router.patch('/:student_id', async (req, res, next) => {
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(req.params.student_id, { teacher: '' }, { new: true });
        res.json(updatedStudent);
    } catch (e) {
        next(e);
    }
});

export const studentRouter = router;
