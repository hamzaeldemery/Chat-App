const express = require("express");
const path = require("path");
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')




const mongoose = require("mongoose")


const app = express();
app.use(flash())


const CHAT = new SessionStore({ 
    uri: 'mongodb://localhost:27017/chat-app',
    collection: 'sessions'
})

app.use(session({
    secret:'we are the champion you cant guess this loser hahaha',
    saveUninitialized: false,
    store: CHAT
}))

app.use(express.static(path.join(__dirname,'assets'))) 
app.use(express.static(path.join(__dirname,'images')))

app.set('view engine','ejs')
app.set('views','views')//default

const server = require("http").createServer(app);

const socketIO = require('socket.io');
const io = socketIO(server);

io.onlineUsers = {}

require('./sockets/friend.socket')(io)
require('./sockets/init.socket')(io)
require('./sockets/chat.socket')(io)

const authRouter = require('./routes/auth.route')
const profileRouter = require('./routes/profile.route')
const friendRouter = require('./routes/friends.route')
const homeRouter = require('./routes/home.route')
const getFriendRequests = require('./models/users.model').getFriendRequests
const chatRouter = require('./routes/chat.route')

app.use((req,res,next) => {
    if(req.session.userId){
        getFriendRequests(req.session.userId).then((requests) => {
            req.friendRequests = requests;
            next();
        }).catch(err => res.redirect('/error'));
    }else{
        next();
    }
})

app.use('/',homeRouter)
app.use('/chat',chatRouter)
app.use('/profile',profileRouter)
app.use('/friend',friendRouter)
app.use('/',authRouter) 

 

app.get('/error',(req,res,next) => {
    res.status(500);
    res.render('error.ejs',{
        requests: req.friendRequests,
        user: req.session.userId,
        pageName: 'Error'
    })
})


server.listen(3000,(err) => {
    console.log(err);
    console.log("server listening on port 3000");
})