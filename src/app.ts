import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity';
import { apiRouter } from './routers/apiRouter';
import { config } from './configs/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    // =================================
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .where('user.firstName = "UA"')
    //     .getOne();
    // =================================
    res.json(users);
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(User)
        .update({ id: +req.params.id }, {
            password,
            email,
        });
    res.json(createdUser);
});

app.delete('/users/:id', async (req, res) => {
    const deletedUser = await getManager()
        .getRepository(User)
        // .delete({ id: +req.params.id });
        .softDelete({ id: +req.params.id });
    res.json(deletedUser);
});

const { PORT } = config;
app.listen(PORT, async () => {
    console.log(`Server has been started on port ${PORT} 🚀🚀🚀`);

    try {
        const connection = await createConnection();
        if (connection) console.log('Database connected');
    } catch (error) {
        if (error) console.log(error);
    }
});
