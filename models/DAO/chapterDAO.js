const Chapter = require('../chapter');
const Story = require('../story');

exports.get_chapter_list = ()=>{
    var mysort = {name:1};
    return Chapter.find({isDeleted: false}).populate('story').sort(mysort);
};

exports.get_chapter_by_id = id =>{
    return Chapter.findOne({_id: id,isDeleted: false}).populate('story');
};

exports.get_chapter_list_by_story = async id => {
    const storyObj = await Story.findOne({_id: id,isDeleted: false});
    var mysort = {name:1};
    return Chapter.find({story: storyObj}).populate('story').sort(mysort);
};

exports.get_story_by_chapter = async id => {
  const chapterObj = await Chapter.findOne({_id: id,isDeleted: false});
  return Story.findOne({_id: chapterObj.story});
};