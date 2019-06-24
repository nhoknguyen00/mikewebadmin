const Genre = require('../genre');

exports.get_genre_list = ()=>{
    var mysort = {name:1};
    return Genre.find({isDeleted: false}).sort(mysort);
};

exports.get_genre_by_id = id =>{
    return Genre.findOne({_id: id,isDeleted: false});
};