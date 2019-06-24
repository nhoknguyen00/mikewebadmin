const User = require('../user');

exports.get_user_list = ()=>{
    var mysort = {name:1};
    return User.find().sort(mysort);
};

exports.get_user_by_id = id =>{
    return User.findOne({_id: id});
};