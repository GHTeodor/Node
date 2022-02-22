import express, { Request, Response } from 'express';

import { users } from './users';

const app = express();
console.log(users);

app.get('/', (req: Request, res: Response) => {
    res.end();
});

const PORT: number = 5200;
app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}🚀🚀🚀`));