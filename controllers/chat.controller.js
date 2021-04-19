const messagesModel = require('../models/message.model')
const chatModel = require('../models/chat.model')

exports.getChat = (req,res,next) => {
    let chatId = req.params.id;
    messagesModel.getChat(chatId).then((messages) =>{
        if(messages.length === 0){
            let friend
            chatModel.getChat(chatId).then((chat) => {
                friend = chat.users.find(user => String(user._id) !== String(req.session.userId))
                res.render('chat',{
                    pageName: friend.username,
                    user: req.session.userId,
                    requests: req.friendRequests,
                    friend: friend, 
                    messages: messages,
                    chatId: chatId  
                
                })
            })  
        }else{
            friend = messages[0].chat.users.find(user => String(user._id) !== String(req.session.userId))
            res.render('chat',{
                pageName: friend.username,
                user: req.session.userId,
                requests: req.friendRequests,
                friend: friend,
                messages: messages,
                chatId: chatId
            })
        }
    })
    
}