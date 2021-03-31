const { param } = require('../routes/profile.route');
const userModel = require('../models/users.model');


exports.profileRedirect = (req,res,next) => {
    res.redirect('/profile/' + req.session.userId);
}
 
exports.profileGet = (req,res,next) => {
    id = req.params.id;
    if(!id){
        res.redirect('/profile/'+req.session.userId)
    }
    userModel.getUserData(id).then((data) => {
        uName = data.username;
        img = data.img; 
        isOwn = false;
        isFriend = false;  
        isRequested = false;
        isRequesting = false;

        for(let frd of data.friends){ 
            if(String(req.session.userId) === frd.id){ 
                isFriend = true;
            }
        }
        for(let frd of data.comingRequests){ 
            if(String(req.session.userId) === frd.id){
                isRequesting = true;
            }
        }
        for(let frd of data.sentRequests){
            if(String(req.session.userId) === frd.id){
                isRequested = true;
            }
        }
        if(id === String(req.session.userId)){
            isOwn = true;
        }
        my = null;
        if(!isOwn){
            userModel.getDataForRequest(req.session.userId).then((myData)=>{
                res.render("profile",{
                    requests: req.friendRequests,
                    user: req.session.userId, 
                    my: myData,
                    his: data,
                    img: img,
                    userName: uName,
                    pageName: uName,
                    isOwner: isOwn,
                    isFriend: isFriend, 
                    isRequested: isRequested,
                    isRequesting: isRequesting 
                })
            })
        }
        else{
            res.render("profile",{
                requests: req.friendRequests,
                user: req.session.userId, 
                my: data,
                his: data,
                img: img,
                userName: uName, 
                pageName: uName,
                isOwner: isOwn, 
                isFriend: isFriend,
                isRequested: isRequested,
                isRequesting: isRequesting
            })
        }
    })
}