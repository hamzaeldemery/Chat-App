

socket.emit("getOnlineFriends", myId)

socket.on("onlineFriends", onlineFriends => {
    console.log("onlineFriends: "+ onlineFriends)
})

