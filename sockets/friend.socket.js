const userModel = require('../models/users.model')
module.exports = (io) => {
    io.on('connection',(socket) => {
        socket.on('sendFriendRequest', data => {
            userModel.addFriendRequest(data).then(() => {
                socket.emit('requestSent')
                io.to(data.hisId).emit('newFreindRequest',{name: data.myName,id: data.myId});
            }).catch(err => {
                socket.emit('requestFailed')
            })
        })
        socket.on('cancelFriendRequest',data => {
            userModel.cancelRequest(data).then(() => {
                socket.emit('requestCancelled');
                io.to(data.hisId).emit('unRequested')
            })
        })
        socket.on("getOnlineFriends",id => {  
            userModel.getFriends(id).then(friends => {
                let onlineFriends = friends.filter(friend => io.onlineUsers[friend.id]);
                socket.emit("onlineFriends",onlineFriends);
            })
        })  
    })    
}

 