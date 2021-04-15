

socket.emit("getOnlineFriends", myId)

socket.on("onlineFriends", onlineFriends => {
    console.log("onlineFriends: "+ onlineFriends)

    let divOnline = document.getElementById("onlineFriends");
    if(onlineFriends.length === 0){
        divOnline.innerHTML += `
            <a class = "alert alert-danger">No online friends</a>
        `
    }
    else{
        let html = `<div class = "row online-users ">`
        for(let friend of onlineFriends){
            console.log('friend: ')
            console.log(friend)
            html += `
            <div class = "row online-user"> 
                <div class="col-md-5 col-sm-5">
                    <img class = "profile-photo-lg" src="/${friend.img}">
                </div>
                <div class="col-md-4 col-sm-4" style = "padding-top: 20px;">
                    <h5><a  style="text-decoration: none;" class="profile-link" href = "/profile/${friend.id}" >${friend.name}</a></h5>
                </div>
                <div class="col-md-2 col-sm-2 " style = "padding-top: 20px;">
                    <a href = "/chat/${friend.chatId}" class = "btn btn-success">Chat</a>
                </div>                     
            </div>
            `   
        }
        html += `</div>` 
        divOnline.innerHTML += html;
    }
})

