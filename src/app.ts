import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { apiRouter } from './routers/apiRouter';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const { PORT, MONGODB } = process.env;
app.listen(PORT, async () => {
    console.log(`Server has been started on port ${PORT} 🚀🚀🚀`);

    try {
        const connection = await mongoose.connect(MONGODB);
        if (connection) console.log('Database connected');
    } catch (error) {
        if (error) console.log(error);
    }
});
