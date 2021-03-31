const userModel = require('../models/users.model');


exports.getHome = (req,res,next) => {
    let id = req.session.userId;
    res.render('home',{
        pageName: 'Home',
        user: id,
        requests: req.friendRequests
    })

}