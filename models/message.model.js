const mongoose = require('mongoose')
const DB_url = 'mongodb://localhost:27017/chat-app'

const messageSchema = mongoose.Schema({
    chat: {type: mongoose.Schema.Types.ObjectId, ref: 'chat'},
    content: String,
    sender: String,
    timeStamp: Number
});

const Message = mongoose.model('message',messageSchema)

exports.getChat = async chatId => {
    try {
        await mongoose.connect(DB_url);
        
        let message = await Message.find({chat:chatId},null,{
            timestamps: 1
        }).populate({
            path: 'chat',
            model: 'chat',
            populate: {
                path: 'users',
                model: 'user',
                select: 'username img'
            }
        })
        await mongoose.disconnect();
        return message;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error); 
    }
}

exports.newMessage = async (sender,msg,chatId) => {
    try {
        console.log(sender,msg,chatId)
        await mongoose.connect(DB_url);
        let message = new Message({
            chat: chatId,
            content: msg,
            sender: sender,
            timeStamp : Date.now()
        })
        await message.save();
        await mongoose.disconnect();
    } catch (error) {
        await mongoose.disconnect()
        throw new Error(error)
    }
}