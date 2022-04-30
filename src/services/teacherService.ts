import { DeleteResult, UpdateResult } from 'typeorm';

import { teacherModel } from '../models(MongoDB)';
import { ITeacher } from '../interfaces';

class TeacherService {
    public async getTeachers(): Promise<ITeacher[]> {
        return teacherModel.find({});
    }

    public async createTeacher(teacher: ITeacher): Promise<ITeacher> {
        return teacherModel.create(teacher);
    }

    public async updateTeacher(id: string, teacher: ITeacher): Promise<UpdateResult | null> {
        return teacherModel.findByIdAndUpdate(id, teacher, { new: true });
    }

    public async deleteTeacherById(id: string): Promise<DeleteResult | null> {
        return teacherModel.findByIdAndDelete(id);
    }
}

export const teacherService = new TeacherService();
