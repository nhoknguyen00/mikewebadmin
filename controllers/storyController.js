const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Story = require('../models/story');
const storyDAO = require('../models/DAO/storyDAO');
const genreDAO = require('../models/DAO/genreDAO');
const authorDAO = require('../models/DAO/authorDAO');

exports.story_list = async function(req,res)
{
    const storyList = await storyDAO.get_story_list();
    res.render('stories/list',{
        pageTitle: 'Danh sách truyện',
        storyList: storyList
    })
};

exports.story_list_by_author = async function(req,res)
{
    const storyList = await storyDAO.get_story_list_by_author(req.params.id);
    const author = await authorDAO.get_author_by_id(storyList[0].author);
    res.render('stories/list',{
        pageTitle: 'Danh sách truyện của ' + author.name,
        storyList: storyList
    })
};

exports.story_list_by_genre = async function(req,res)
{
    const storyList = await storyDAO.get_story_list_by_genre(req.params.id);
    const genre = await genreDAO.get_genre_by_id(storyList[0].genre);
    res.render('stories/list',{
        pageTitle: 'Danh sách truyện ' + genre.name,
        storyList: storyList
    })
};

exports.story_add_get = async function(req,res)
{
    const authorList = authorDAO.get_author_list();
    const genreList = genreDAO.get_genre_list();
    res.render('stories/add', {
        pageTitle: 'Thêm truyện',
        authorList: await authorList,
        genreList: await genreList
    });
};

exports.story_add_post = function(req,res) {
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        let story = new Story({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            info: req.body.info,
            genre: req.body.genre,
            author: req.body.author,
            finished: req.body.finished,
            views: 0,
            img: '/img/'+req.body.img,
        });
        story.save(function(error){
            if(error) throw error;
            res.redirect('list');
        });
    });
};

exports.story_update_get = async function(req,res)
{
    const story = await storyDAO.get_story_by_id(req.params.id);
    const authorList = authorDAO.get_author_list();
    const genreList = genreDAO.get_genre_list();
    res.render('stories/update',{
        pageTitle: 'Cập nhật truyện',
        story: story,
        authorList: await authorList,
        genreList: await genreList
    })
};

exports.story_update_post = function(req,res)
{
    var story = new Story({
        _id: req.params.id,
        name: req.body.name,
        info: req.body.info,
        genre: req.body.genre,
        author: req.body.author,
        finished: req.body.finished,
        img: '/img/'+req.body.img,
    });

    Story.findByIdAndUpdate(req.params.id,story,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};

exports.story_delete = function(req,res)
{
    var story = new Story({
        _id: req.params.id,
        name: req.body.name,
        isDeleted: true
    });

    Story.findByIdAndUpdate(req.params.id,story,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};