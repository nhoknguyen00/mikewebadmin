const Author = require('../author');

exports.get_author_list = ()=>{
    var mysort = {name:1};
    return Author.find({isDeleted: false}).sort(mysort);
};

exports.get_author_by_id = id =>{
    return Author.findOne({_id: id,isDeleted: false});
};
