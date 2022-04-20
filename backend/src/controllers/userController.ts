import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';

import userService from '../services/userService';
import { IUser } from '../entities/interfaces/IUser';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<any> {
        const users = await userService.getUsers();
        return res.render('users', { users });
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async updateUser(req: Request, res: Response): Promise<Response<UpdateResult>> {
        const { email, password } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.updateUser(+id, email, password);
        return res.json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const deletedUser = await userService.deleteUser(+id);
        return res.json(deletedUser);
    }
}

export default new UserController();
