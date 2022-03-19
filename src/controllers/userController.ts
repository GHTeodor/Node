import { Request, Response } from 'express';

import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        return res.json(await userService.createUser(req.body));
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        return res.json(await userService.getUserByEmail(email));
    }
}

export const userController = new UserController();
