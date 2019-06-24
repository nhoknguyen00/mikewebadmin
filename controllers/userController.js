const User = require('../models/user');
const userDao = require('../models/DAO/userDAO');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
var mongoose = require('mongoose');
var async = require('async');

exports.user_list = async function(req,res) {
    const userList = await userDao.get_user_list();
    res.render('users/list',{
        pageTitle:'Danh sách người dùng',
        userList: userList
    })
};

exports.user_delete = function(req,res){
    User.findByIdAndRemove(req.params.id,function (err) {
        if(err){return next(err);}
        res.redirect("../list");
    })
};