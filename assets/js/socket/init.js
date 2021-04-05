const socket = io()
const btn = document.getElementById('friendRequestsDropdown');
let myId = document.getElementById("userId").value;

socket.on('connect' , () => {
    socket.emit('joinNotificationRoom',myId)
    socket.emit('goOnline',myId)
});

socket.on('newFreindRequest', (data) => {
    console.log(data);
    const friendRequest = document.getElementById('friendRequests')
    const sp = friendRequest.querySelector('span')
    if(sp)sp.remove()
    friendRequest.innerHTML += `
        <a class="dropdown-item" href="/profile/${data.id}">${data.name}</a>
    `
    
    btn.classList.remove('btn-secondary')
    btn.classList.add('btn-danger')
});

btn.onclick = (e) => {

    console.log("HI")
    btn.classList.remove('btn-danger')
    btn.classList.add('btn-secondary')
    console.log(btn.classList)
}
