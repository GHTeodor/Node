import { studentModel } from '../models(MongoDB)';
import { IStudent } from '../interfaces';

class StudentService {
    public async getStudents(): Promise<IStudent[]> {
        return studentModel.find({});
    }

    public async createStudent(student: IStudent): Promise<IStudent> {
        return studentModel.create(student);
    }

    public async updateStudentById(id: string, student: IStudent): Promise<IStudent | null> {
        return studentModel.findByIdAndUpdate(id, student, { new: true });
    }

    public async deleteStudentById(id: string): Promise<IStudent | null> {
        return studentModel.findByIdAndDelete(id);
    }
}

export const studentService = new StudentService();
