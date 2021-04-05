const fs = require("fs")

module.exports = io => {
    io.on("connection", socket => {

        socket.on('joinNotificationRoom', id => {
            socket.join(id);
            console.log("joined" + id)
        });
        socket.on("goOnline" , id => {
            io.onlineUsers[id] = true;
            console.log("online: " + io.onlineUsers)
            socket.on("disconnect", () => {
                io.onlineUsers[id] = false;
                console.log(io.onlineUsers)
            })
        })
    })
}