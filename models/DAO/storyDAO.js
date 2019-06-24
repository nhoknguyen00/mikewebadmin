const Story = require('../story');
const Author = require('../author');
const Genre = require('../genre');

exports.get_story_list = ()=>{
    var mysort = {name:1};
    return Story.find({isDeleted: false}).populate('genre author').sort(mysort);
};

exports.get_story_by_id = id =>{
    return Story.findOne({_id: id, isDeleted: false}).populate('genre author');
};

exports.get_story_list_by_author = async id => {
    const authorObj = await Author.findOne({_id: id, isDeleted: false});
    var mysort = {name:1};
    return Story.find({author: authorObj}).populate('genre author').sort(mysort);
};

exports.get_story_list_by_genre = async id => {
    const genreObj = await Genre.findOne({_id: id, isDeleted: false});
    var mysort = {name:1};
    return Story.find({genre: genreObj}).populate('genre author').sort(mysort);
};