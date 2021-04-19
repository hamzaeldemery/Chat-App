
const sendBtn = document.getElementById('send')
const friend  = document.getElementById("friendData").value
const chatId  = document.getElementById("chatId").value
const textBox = document.getElementById("message")
const displayArea = document.getElementById("message container")
socket.emit('joinChat',chatId)

sendBtn.onclick = () => {
    let message = document.getElementById('message').value;
    console.log('message: ', message)
    socket.emit('sendMessage',{
        myId,
        friend,
        chatId,
        message
    }, () => {
        textBox.value = "";
    })
}

socket.on('messageSent',msg => {
    displayArea.innerHTML+=`
        <span>${msg}</span>
    `
})
