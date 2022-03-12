import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

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

app.post('/users', async (req, res) => res.json(await getManager().getRepository(User).save(req.body)));

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

const PORT:number = 5200;
app.listen(PORT, async () => {
    try {
        const connection = await createConnection();
        if (connection) console.log('Database connected');
    } catch (error) {
        if (error) console.log(error);
    }
    console.log(`Server has been started on port ${PORT} 🚀🚀🚀`);
});
