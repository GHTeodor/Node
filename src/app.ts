import 'reflect-metadata';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';
import { createConnection } from 'typeorm';
import { engine } from 'express-handlebars';

import { config } from './configs';
import { apiRouter } from './routers/apiRouter';
import { socketController } from './controllers';
// import { cronRun } from './cron';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    console.log('______________-');
    console.log('userId: ', socket.handshake.query.userId);
    console.log('accessToken: ', socket.handshake.query.accessToken);
    console.log('______________-');

    socket.on('message:create', (data: any) => socketController.messageCreate(io, socket, data));
    socket.on('join_room', (data: any) => socketController.joinRoom(io, socket, data));
});

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
server.listen(PORT, async () => {
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
