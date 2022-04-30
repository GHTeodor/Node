import { Request, Response, NextFunction } from 'express';

import { teacherService } from '../services';

class TeacherController {
    public async getTeachers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const teachers = await teacherService.getTeachers();
            res.json(teachers);
        } catch (e) {
            next(e);
        }
    }

    public async createTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createdTeacher = await teacherService.createTeacher(req.body);
            res.json(createdTeacher);
        } catch (e) {
            next(e);
        }
    }

    public async updateTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedTeacher = await teacherService.updateTeacher(req.params.id, req.body);
            res.json(updatedTeacher);
        } catch (e) {
            next(e);
        }
    }

    public async deleteTeacherById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedTeacher = await teacherService.deleteTeacherById(req.params.id);
            res.json(deletedTeacher);
        } catch (e) {
            next(e);
        }
    }
}

export const teacherController = new TeacherController();
