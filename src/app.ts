import 'reflect-metadata';
import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import path from 'path';
import { createConnection } from 'typeorm';
import { engine } from 'express-handlebars';

import { config } from './configs';
import { apiRouter } from './routers/apiRouter';
// import { cronRun } from './cron';

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRouter);

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        data: err.data,
    });
});

const { PORT, MongoDB } = config;
app.listen(PORT, async () => {
    console.log(`Server has been started on PORT: ${PORT} 🚀🚀🚀`);
    try {
        const connectionMySQL = await createConnection();
        if (connectionMySQL) {
            console.log('MySQL is connected');
            // await cronRun();
        }

        const connectionMongoDB = await mongoose.connect(MongoDB as string);
        if (connectionMongoDB) console.log('MongoDB is connected');
    } catch (error) {
        if (error) console.log(error);
    }
});
