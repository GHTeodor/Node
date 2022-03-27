import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { IUser, User } from '../entity';
import { userService } from '../services';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await getManager().getRepository(User).find({ relations: ['posts'] });
        // =================================
        // const users = await getManager().getRepository(User)
        //     .createQueryBuilder('user')
        //     .where('user.firstName = "UA"')
        //     .getOne();
        // =================================
        return res.json(users);
    }

    public async patchUser_Email_Password(req: Request, res: Response): Promise<Response<IUser>> {
        const { email, password } = req.body;
        const createdUser = await getManager()
            .getRepository(User)
            .update({ id: +req.params.id }, {
                email,
                password,
            });
        return res.json(createdUser);
    }

    public async deleteUserById(req: Request, res: Response): Promise<Response<IUser>> {
        const deletedUser = await getManager()
            .getRepository(User)
            // .delete({ id: +req.params.id });
            .softDelete({ id: +req.params.id });
        return res.json(deletedUser);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        return res.json(await userService.createUser(req.body));
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        return res.json(await userService.getUserByEmail(email));
    }
}

export const userController = new UserController();
