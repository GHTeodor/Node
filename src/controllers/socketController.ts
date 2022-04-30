export const socketController = {
    messageCreate: (io: any, socket: any, data: any) => {
        console.log(data);
        // // ONE TO ONE
        // // socket.emit('message:get-all', { messages: [{ text: data.message }] });
        //
        // // SEND TO ALL ONLINE USERS
        io.emit('message:get-all', { messages: [{ text: data.message }] });
    },

    joinRoom: (io: any, socket: any, data: any) => {
        socket.join(data.id);

        // ONE TO MANY AVOID SENDER
        // socket.broadcast.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });

        // EMIT TO ALL USERS IN ROOM (INCLUDE SENDER)
        io.to(data.id).emit('user_join_room', { message: `User ${socket.id} joined room ${data.id}` });
    },
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
};
