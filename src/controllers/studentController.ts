import { NextFunction, Request, Response } from 'express';

import { studentService } from '../services';

class StudentController {
    public async getStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const students = await studentService.getStudents();
            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    public async createStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createdStudent = await studentService.createStudent(req.body);
            res.json(createdStudent);
        } catch (e) {
            next(e);
        }
    }

    public async updateStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedStudent = await studentService.updateStudentById(req.params.id, req.body);
            res.json(updatedStudent);
        } catch (e) {
            next(e);
        }
    }

    public async deleteStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedStudent = await studentService.deleteStudentById(req.params.id);
            res.json(deletedStudent);
        } catch (e) {
            next(e);
        }
    }
}

export const studentController = new StudentController();
