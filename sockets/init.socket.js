const fs = require("fs")

module.exports = io => {
    io.on("connection", socket => {

        socket.on('joinNotificationRoom', id => {
            socket.join(id);
            console.log("joined" + id)
        });
        socket.on("goOnline" , id => {
            io.onlineUsers[id] = true;
            socket.on("disconnect", () => {
                io.onlineUsers[id] = false;
            })
        })
    })
}