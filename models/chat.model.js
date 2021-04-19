const mongoose = require('mongoose')
const DB_url = 'mongodb://localhost:27017/chat-app'

const chatSchema = mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}]
})

const Chat = mongoose.model('chat',chatSchema)

exports.getChat = async(chatId) => {
    try {
        await mongoose.connect(DB_url);
        
        let chat = await Chat.findById(chatId).populate({path:'users',select:'username img'})
        await mongoose.disconnect();
        return chat; 
        console.tim
    } catch (error) { 
        mongoose.disconnect();
        throw new Error(error); 
    }
}


exports.Chat = Chat;