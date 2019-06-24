const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Chapter = require('../models/chapter');
const storyDAO = require('../models/DAO/storyDAO');
const chapterDAO = require('../models/DAO/chapterDAO');

exports.chapter_list = async function(req,res)
{
    const chapterList = await chapterDAO.get_chapter_list();
    res.render('chapters/list',{
        pageTitle: 'Danh sách chương',
        chapterList: chapterList,
    })
};

exports.chapter_list_by_story = async function(req,res)
{
    const chapterList = await chapterDAO.get_chapter_list_by_story(req.params.id);
    const story = await chapterDAO.get_story_by_chapter(chapterList[0]._id);
    res.render('chapters/list',{
        pageTitle: 'Danh sách chương của truyện ' + story.name,
        chapterList: chapterList,
        //storyList: storyList,
    })
};


exports.chapter_add_get = async function(req,res)
{
    const storyList = storyDAO.get_story_list();
    res.render('chapters/add', {
        pageTitle: 'Thêm chương',
        storyList: await storyList,
    });
};

exports.chapter_add_post = function(req,res) {
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        let chapter = new Chapter({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            content: req.body.content,
            story: req.body.story
        });
        chapter.save(function(error){
            if(error) throw error;
            res.redirect('list');
        });
    });
};

exports.chapter_update_get = async function(req,res)
{
    const chapter = await chapterDAO.get_chapter_by_id(req.params.id);
    const storyList = storyDAO.get_story_list();
    res.render('chapters/update',{
        pageTitle: 'Cập nhật chương',
        chapter: chapter,
        storyList: await storyList,
    })
};

exports.chapter_update_post = function(req,res)
{
    var chapter = new Chapter({
        _id: req.params.id,
        name: req.body.name,
        content: req.body.content,
        story: req.body.story
    });

    Chapter.findByIdAndUpdate(req.params.id,chapter,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};

exports.chapter_delete = function(req,res)
{
    var chapter = new Chapter({
        _id: req.params.id,
        isDeleted: true
    });

    Chapter.findByIdAndUpdate(req.params.id,chapter,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};