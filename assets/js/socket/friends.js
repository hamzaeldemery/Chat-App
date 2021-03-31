const addFriendBtn = document.getElementById('addFriendBtn')

const myName=document.getElementById("myName").value
const myImg=document.getElementById("myImg").value
// const myId=document.getElementById("myId").value
const hisName=document.getElementById("hisName").value
const hisImg=document.getElementById("hisImg").value
const hisId=document.getElementById("hisId").value



addFriendBtn.onclick =  (e) => {
    e.preventDefault();
    socket.emit('sendFriendRequest' , {
        myName,
        myImg, 
        myId,
        hisName,
        hisImg,
        hisId
    })
}

socket.on('requestSent', () => {
    addFriendBtn.remove();
    document.getElementById('friends-form').innerHTML += `
    <input id="cancelRequest" type="submit" value="Cancel request" class="btn btn-primary" formaction="/friend/cancel">
    `;
})

socket.on('newFreindRequest', () => {
    addFriendBtn.remove();
    document.getElementById('friends-form').innerHTML += `
    <input id="acceptBtn" type="submit" value="Accept" class="btn btn-success" formaction="/friend/accept">
    <input id="rejectBtn" type="submit" value="Reject" class="btn btn-success" formaction="/friend/reject">
    `;
})