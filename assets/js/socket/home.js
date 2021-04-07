

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
        let html = `<div class = "row">`
        for(let friend of onlineFriends){
            console.log('friend: ')
            console.log(friend)
            html += `
            <div class="col col-12 col-md-6 col-lg-3"  >
                <img src="/${friend.img}">
                <div>
                    <a href = "/profile/${friend.id}">${friend.name}</a>
                    <h3>Chat</h3>
                </div>                    
            </div>
            `   
        }
        html += `</div>`
        divOnline.innerHTML += html;
    }
})

