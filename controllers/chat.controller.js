const chatModel = require('../models/message.model')

exports.getChat = (req,res,next) => {
    let id = req.params.id;
    let messages = chatModel.getChat(id);
    console.log(messages)
    res.send(messages)
}