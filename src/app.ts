import 'reflect-metadata';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import { createConnection } from 'typeorm';
import SocketIO from 'socket.io';

import { apiRouter } from './routers/apiRouter';
import { config } from './configs/config';
import { cronRun } from './cron';
import { socketController } from './controllers';

const app = express();
const server = http.createServer(app);
// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    console.log(socket.handshake.query);
    console.log(socket.handshake.accessToken);

    socket.on('message:create', (data: any) => socketController.messageCreate(io, socket, data));
    socket.on('join_room', (data: any) => {
        socket.join(data.id);

        // ONE TO MANY EXCLUDE SENDER
        // socket.broadcast.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });

        // EMIT TO ALL USERS IN ROOM (INCLUDE SENDER)
        io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
    });
    // --------------------------------------------------------------------------------------------------

    // ONE TO ONE
    // socket.emit(event, {});

    // SEND TO ALL ONLINE USERS (INCLUDE SENDER)
    // io.emit(event, {})

    // SEND TO ALL ONLINE USERS (AVOID SENDER)
    // socket.broadcast.emit(event, {})

    // socket.join(room_id)

    // TO ROOM AVOID SENDER
    // socket.broadcast.to(room_id).emit(event, {})

    // TO ROOM INCLUDE SENDER
    // io.to(room_id).emit(event, {})

    // --------------------------------------------------------------------------------------------------
});

app.use(fileUpload);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const { PORT } = config;
server.listen(PORT, async () => {
    console.log(`Server has been started on port ${PORT} 🚀🚀🚀`);

    try {
        const connection = await createConnection();
        if (connection) console.log('Database connected');
        cronRun();
    } catch (error) {
        if (error) console.log(error);
    }
});
