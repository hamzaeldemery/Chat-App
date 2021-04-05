const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Db } = require('mongodb')

const DB_url = 'mongodb://localhost:27017/chat-app'


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    img: {
        type: String,
        default:"default-img-profile.jpg"
    }, 
    isOnline: {
        type: Boolean,
        default: false
    },
    friends: {
        type: [{name:String, id: String, img: String}],
        default: []
    },
    sentRequests: {
        type: [{name:String, id: String, img: String}],
        default: []
    },
    comingRequests: {
        type: [{name:String, id: String, img: String}],
        default: []
    }
}) 

const User = mongoose.model('user',userSchema)


exports.checkUsernameExsist = (username) => {
    
    return new Promise((resolve,reject) =>{
         mongoose.connect(DB_url).then( () => {
              User.count({
                        username:username
              }).then(cnt =>{
                   mongoose.disconnect()
                   resolve(cnt)
              })
         }).catch(err => {
              mongoose.disconnect()
              reject(err)
         })
    })
}

exports.checkEmailExsist = (email) => {
    //console.log('email:' + email)
    //check if email exsists
    return new Promise((resolve,reject) =>{
         mongoose.connect(DB_url).then( () => {
              User.count({
                        email:email
              }).then(cnt =>{
                   mongoose.disconnect()
                   resolve(cnt)
              })
         }).catch(err => {
              mongoose.disconnect()
              reject(err)
         })
    })
}

exports.addUser = (username,email,pass) => {
    // hash password
    let pas = bcrypt.hashSync(pass,10)
    //create new user
    let user = new User({
         username : username,
         email: email,
         password: pas
    })
    //save user
    return new Promise((resolve,reject) =>{  
         mongoose.connect(DB_url).then(() =>{ 
              user.save(function(err,usr){
                   if(err)return console.log(err) 
                   mongoose.disconnect()   
                   resolve(usr)    
              })    
         }).catch(err => {
              mongoose.disconnect()
              reject(err)
         })
    })   
}
 

exports.login = (username,password) => {

    //check userame
    return new Promise((resolve,reject) =>{
         mongoose.connect(DB_url).then( () =>{
              User.findOne({
                   username: username
              }).then((usr) =>{
                   mongoose.disconnect()
                   if(!usr){
                        mongoose.disconnect()
                        reject('Username does not exist!')
                   }else{
                        if(!bcrypt.compareSync(password,usr.password)){
                             mongoose.disconnect()
                             reject('Password incorrect!')
                        }else{
                             mongoose.disconnect()
                             resolve({
                                  id: usr._id,
                                  isAdmin: usr.isAdmin
                             })
                        }
                   }
              })
         }).catch(err => {
              mongoose.disconnect()
              reject(err)
         })
    })


}

exports.getUserData = (id) => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() =>{
               User.findById(id).then((usr) => {
                    mongoose.disconnect();
                    resolve(usr);
               })
          }).catch((err) => {
               mongoose.disconnect();
               reject(err);
          })
     })
}

exports.getDataForRequest = (id) => {
     return new Promise((resolve,reject) => {
          mongoose.connect(DB_url).then(() => {
               User.findById(id,{username : true, img : true}).then((usr) => {
                    mongoose.disconnect();
                    resolve(usr);
               })
          }).catch((err) => {
               mongoose.disconnect();
               reject(err);
          })
     })
}

exports.addFriendRequest = async (data) => {
     let me = {
          id: data.myId,
          img: data.myImg,
          name: data.myName 
     }
     let friend = {
          id: data.hisId,
          img: data.hisImg,
          name: data.hisName 
     }
     try{
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: friend.id
          },{$push:{
                    comingRequests: {name:me.name, id: String(me.id), img: me.img}
               }
          })
          await mongoose.disconnect()
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: me.id
          },{$push:{
                    sentRequests: {name: friend.name, id: String(friend.id), img: friend.img}
               }
          })
          mongoose.disconnect()
          return;
     } catch ( error) {
          mongoose.disconnect()
          console.log(error)
          throw new Error(error)
     }
     
} 


exports.cancelRequest = async (data) => {
     let me = {
          id: data.myId,
          img: data.myImg,
          name: data.myName 
     }
     let friend = {
          id: data.hisId,
          img: data.hisImg,
          name: data.hisName 
     }
     try{ 
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: me.id
          },{$pull:{
               sentRequests: {id: String(friend.id)}
               } 
          })
          await mongoose.disconnect()
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: friend.id
          },{$pull:{
               comingRequests: {id: String(me.id)}
               }
          })
          mongoose.disconnect()
          return
     } catch ( error) {
          mongoose.disconnect()
          throw new Error(error)
     }
}

exports.rejectRequest = async (data) => {
     let me = {
          id: data.myId,
          img: data.myImg,
          name: data.myName 
     }
     let friend = {
          id: data.hisId,
          img: data.hisImg,
          name: data.hisName 
     }
     try{ 
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: me.id
          },{$pull:{
               comingRequests: {id: String(friend.id)}
               } 
          })
          await mongoose.disconnect()
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: friend.id
          },{$pull:{
               sentRequests: {id: String(me.id)}
               }
          })
          mongoose.disconnect()
          return
     } catch ( error) {
          mongoose.disconnect()
          console.log(error)
          throw new Error(error)
     }
}


exports.addToFriends = async (data) => {
     let me = {
          id: data.myId,
          img: data.myImg,
          name: data.myName 
     }
     let friend = {
          id: data.hisId,
          img: data.hisImg,
          name: data.hisName 
     }
     try{
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: friend.id
          },{$push:{
               friends: { name: me.name, id: String(me.id), img: me.img}
               }
          })
          await mongoose.disconnect()
          await mongoose.connect(DB_url)
          await User.updateOne({
               _id: me.id
          },{$push:{
               friends: {name: friend.name, id: String(friend.id), img: friend.img}
               }
          })
          mongoose.disconnect()  
          return
     } catch ( error) {
          mongoose.disconnect()
          throw new Error(error)
     }

}

exports.removeFromFriends = async (data) => {
     let me = {
          id: data.myId,
          img: data.myImg,
          name: data.myName 
     }
     let friend = {
          id: data.hisId,
          img: data.hisImg,
          name: data.hisName 
     }
     try{
          await mongoose.connect(DB_url)
          await User.updateOne({
                    _id: friend.id
               },{$pull:{
                    friends: {id: String(me.id)}
                    }
               })
          await mongoose.disconnect()
          await mongoose.connect(DB_url)
          await User.updateOne({
                    _id: me.id
               },{$pull:{
                    friends: {id: String(friend.id)}
                    }
               })
          mongoose.disconnect();
          return;
     } catch (error){
          mongoose.disconnect();
          throw new Error(error);
     }
}

exports.getFriendRequests = async(id) => {
     try{
          await mongoose.connect(DB_url);
          let reqs  = await User.findById(id,{comingRequests: true});
          mongoose.disconnect();
          return reqs.comingRequests;
     }
     catch(error){
          mongoose.disconnect(); 
          throw new Error(error); 
     }
}

exports.getFriends = async(id) => {
     try{
          await mongoose.connect(DB_url);
          let reqs  = await User.findById(id,{friends: true});
          mongoose.disconnect();
          return reqs.friends;
     }
     catch(error){
          mongoose.disconnect(); 
          throw new Error(error); 
     }
}