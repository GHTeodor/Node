import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { errors } from 'celebrate';

import { apiRouter } from './routers/apiRouter';
import { config } from './configs/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);
app.use(errors({ statusCode: 400 }));
// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.code || 500)
        .json({
            message: err.message,
            data: err.data,
        });
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
