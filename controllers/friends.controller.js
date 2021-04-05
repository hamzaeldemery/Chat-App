const userModel = require('../models/users.model');

exports.addFriend = (req,res,next) => {
    data = {
        myName: req.body.myName,
        myId: req.body.myId,
        myImg: req.body.myImg,
        hisName: req.body.hisName,
        hisId: req.body.hisId,
        hisImg: req.body.hisImg
    }
    userModel.addFriendRequest(data).then(() => {
        res.redirect('/profile/'+String(req.body.hisId))
    }).catch((err) => {
        console.log(err)
        res.redirect('/error')
    })
} 
exports.acceptRequest = (req,res,next) => {
    data = {
        myName: req.body.myName,
        myId: req.body.myId,
        myImg: req.body.myImg,
        hisName: req.body.hisName,
        hisId: req.body.hisId,
        hisImg: req.body.hisImg
    }
    userModel.rejectRequest(data).then(() =>{
        userModel.addToFriends(data).then(() => {
            res.redirect('/profile/'+req.body.hisId)
        }).catch((err) => {
            console.log(err)
            res.redirect('/error')
        })
    }).catch((err) => {
        console.log(err)
        res.redirect('/error')
    })
}
exports.rejectReqeust = (req,res,next) => {
    data = {
        myName: req.body.myName,
        myId: req.body.myId,
        myImg: req.body.myImg,
        hisName: req.body.hisName,
        hisId: req.body.hisId,
        hisImg: req.body.hisImg
    }
    userModel.rejectRequest(data).then(() => {
        res.redirect('/profile/'+req.body.hisId)
    }).catch((err) => {
        console.log(err)
        res.redirect('/error')
    })
} 
exports.deleteFriend = (req,res,next) => {
    data = {
        myName: req.body.myName,
        myId: req.body.myId,
        myImg: req.body.myImg,
        hisName: req.body.hisName,
        hisId: req.body.hisId,
        hisImg: req.body.hisImg
    }
    userModel.removeFromFriends(data).then(() => {
        res.redirect('/profile/'+req.body.hisId)
    }).catch((err) => {
        console.log(err)
        res.redirect('/error')
    })
}
exports.cancelRequest = (req,res,next) => {
    data = {
        myName: req.body.myName,
        myId: req.body.myId,
        myImg: req.body.myImg,
        hisName: req.body.hisName,
        hisId: req.body.hisId,
        hisImg: req.body.hisImg
    }
    userModel.cancelRequest(data).then(() => {
        res.redirect('/profile/'+req.body.hisId)
    }).catch((err) => {
        console.log(err)
        res.redirect('/error')
    })
}