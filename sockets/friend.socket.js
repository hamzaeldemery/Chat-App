const userModel = require('../models/users.model')
module.exports = (io) => {
    io.on('connection',(socket) => {
        socket.on('sendFriendRequest', data => {
            userModel.addFriendRequest(data).then(() => {
                socket.emit('requestSent');
                io.to(data.hisId).emit('newFreindRequest',{name: data.myName,id: data.myId});
            }).catch(err => {
                console.log(err);
                socket.emit('requestFailed')
            })
        })
        socket.on('cancelFriendRequest',data => {
            userModel.cancelRequest(data).then(() => {
                socket.emit('requestCancelled');
                io.to(data.hisId).emit('unRequested')
            }).catch(err => {
                console.log(err);
                socket.emit('requestFailed')
            })
        })
        socket.on('acceptFriendRequest',data => {
            userModel.rejectRequest(data).then(() => {
                userModel.addToFriends(data).then(() => {
                    socket.emit('requestAccepted');
                    io.to(data.hisId).emit('friendAccepted')
                })
            }).catch(err => {
                console.log(err);
                socket.emit('requestFailed')
            })
        })
        socket.on('rejectFriendRequest',data => {
            userModel.rejectRequest(data).then(() => {
                socket.emit('requestRejected');
                io.to(data.hisId).emit('friendRejected')
            }).catch(err => {
                console.log(err);
                socket.emit('requestFailed')
            })
        })
        socket.on('deleteFriendRequest',data => {
            userModel.removeFromFriends(data).then(() => {
                socket.emit('friendDeleted');
                io.to(data.hisId).emit('friendDeleted')
            }).catch(err => {
                console.log(err);
                socket.emit('requestFailed')
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

 