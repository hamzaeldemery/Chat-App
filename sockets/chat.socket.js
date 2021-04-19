const messageModel = require('../models/message.model');

module.exports = (io) => {
    io.on('connection',(socket) => {
        socket.on('joinChat',(chatId) =>{
            socket.join(chatId)
        })
        socket.on('sendMessage',(data,cb) => {
            let myId = data.myId;
            let chatId = data.chatId;
            let message = data.message;
            messageModel.newMessage(myId,message,chatId).then(() => {
                io.to(chatId).emit('messageSent',message);
                cb();
            })
        })
    })
}