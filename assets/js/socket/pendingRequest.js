const myName=document.getElementById("myName").value
const myImg=document.getElementById("myImg").value
// const myId=document.getElementById("myId").value
const hisName=document.getElementById("hisName").value
const hisImg=document.getElementById("hisImg").value
const hisId=document.getElementById("hisId").value


const cancelRequestBtn = document.getElementById('cancelRequest');

cancelRequestBtn.onclick = (e) => {
    e.preventDefaut();
    socket.emit('cancelFriendRequest',{
        myName,
        myImg, 
        myId,
        hisName,
        hisImg,
        hisId
    })   
}

socket.on('requestCancelled', () => {
    cancelRequestBtn.remove();
    document.getElementById('friends-form').innerHTML +=`
    <input id="addFriendBtn" type="submit" value="Add" class="btn btn-success" >
    `
})



