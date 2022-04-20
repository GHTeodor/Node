import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { createConnection } from 'typeorm';
import { engine } from 'express-handlebars';

import { config } from './configs/config';
import { apiRouter } from './routers/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRouter);

const { PORT } = config;
app.listen(PORT, async () => {
    console.log(`Server has been started on PORT: ${PORT} 🚀🚀🚀`);
    try {
        const connection = await createConnection();
        if (connection) console.log('MySQL DB connected');
    } catch (error) {
        if (error) console.log(error);
    }
});
