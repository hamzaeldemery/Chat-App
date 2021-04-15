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
        let message = await Message.find({chat:chatId}).populate({
            path: 'chat',
            model: 'chat',
            populate: {
                path: 'users',
                model: 'user',
                select: 'username img'
            }
        })
        mongoose.disconnect();
        return message;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error); 
    }
}

