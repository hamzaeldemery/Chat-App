let addFriendBtn = document.getElementById('addFriendBtn')
let cancelRequestBtn = document.getElementById('cancelRequest')
let acceptBtn = document.getElementById('acceptBtn');
let rejectBtn = document.getElementById('rejectBtn');
let deleteFriendBtn = document.getElementById('deleteBtn')


const myName=document.getElementById("myName").value
const myImg=document.getElementById("myImg").value
// const myId=document.getElementById("myId").value
const hisName=document.getElementById("hisName").value
const hisImg=document.getElementById("hisImg").value
const hisId=document.getElementById("hisId").value


if( acceptBtn != null){
    acceptBtn.onclick = (e) => {
        e.preventDefault();
        socket.emit('acceptFriendRequest',{
            myName,
            myImg, 
            myId,
            hisName,
            hisImg,
            hisId
        })   
    }
}

if( rejectBtn != null){
    rejectBtn.onclick = (e) => {
        e.preventDefault();
        socket.emit('rejectFriendRequest',{
            myName,
            myImg, 
            myId,
            hisName,
            hisImg,
            hisId
        })   
    }
}

if(addFriendBtn != null){
    addFriendBtn.onclick = (e) => {
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
}

if(deleteFriendBtn != null){
    deleteFriendBtn.onclick = (e) => {
        e.preventDefault();
        socket.emit('deleteFriendRequest',{
            myName,
            myImg, 
            myId,
            hisName,
            hisImg,
            hisId
        })
    }
}

if(cancelRequestBtn != null){
    cancelRequestBtn.onclick = (e) => {
        e.preventDefault();
        socket.emit('cancelFriendRequest',{
            myName,
            myImg, 
            myId,
            hisName,
            hisImg,
            hisId
        })   
    }
}

//sending request

socket.on('requestSent', () => {
    addFriendBtn.remove();
    document.getElementById('friends-form').innerHTML += `
    <input id="cancelRequest" type="submit" value="Cancel request" class="btn btn-primary" formaction="/friend/cancel">
    `;
    cancelRequestBtn = document.getElementById('cancelRequest')
})

socket.on('newFreindRequest', () => {
    addFriendBtn.remove();
    document.getElementById('friends-form').innerHTML += `
    <input id="acceptBtn" type="submit" value="Accept" class="btn btn-success" formaction="/friend/accept">
    <input id="rejectBtn" type="submit" value="Reject" class="btn btn-success" formaction="/friend/reject">
    `
    acceptBtn = document.getElementById('acceptBtn');
    rejectBtn = document.getElementById('rejectBtn');
})

//sent Request

socket.on('requestCancelled', () => {
    cancelRequestBtn.remove();
    document.getElementById('friends-form').innerHTML +=`
    <input id="addFriendBtn" type="submit" value="Add" class="btn btn-success" formaction="/friend/add">
    `
    addFriendBtn = document.getElementById('addFriendBtn')
})

socket.on('friendAccepted', () => {
    cancelRequestBtn.remove();
    document.getElementById('friends-form').innerHTML +=`
    <input id="deleteBtn" type="submit" value="Delete friend" class="btn btn-danger" formaction="/friend/delete" >
    `
    deleteFriendBtn = document.getElementById('deleteBtn')  
})

socket.on('friendRejected', () => {
    cancelRequestBtn.remove();
    document.getElementById('friends-form').innerHTML +=`
    <input id="addFriendBtn" type="submit" value="Add" class="btn btn-success" formaction="/friend/add">
    `
    addFriendBtn = document.getElementById('addFriendBtn')
})

//delete friend

socket.on('friendDeleted', () => {
    deleteFriendBtn.remove();
    document.getElementById('friends-form').innerHTML += `
        <input id="addFriendBtn" type="submit" value="Add" class="btn btn-success" formaction="/friend/add">
    `
    addFriendBtn = document.getElementById('addFriendBtn')
})


//incoming request

socket.on("unRequested",() => {
    acceptBtn.remove();
    rejectBtn.remove();
    document.getElementById('friends-form').innerHTML +=`
    <input id="addFriendBtn" type="submit" value="Add" class="btn btn-success" formaction="/friend/add">
    `
    addFriendBtn = document.getElementById('addFriendBtn')
})

socket.on('requestAccepted', () => {
    acceptBtn.remove();
    rejectBtn.remove();
    document.getElementById('friends-form').innerHTML +=`
        <input id="deleteBtn" type="submit" value="Delete friend" class="btn btn-danger" formaction="/friend/delete">    
    `
    deleteFriendBtn = document.getElementById('deleteBtn')
})


socket.on('requestRejected', () => {
    acceptBtn.remove();
    rejectBtn.remove();
    document.getElementById('friends-form').innerHTML +=`
    <input id="addFriendBtn" type="submit" value="Add" class="btn btn-success" formaction="/friend/add">
    `
    addFriendBtn = document.getElementById('addFriendBtn')
})