const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Genre = require('../models/genre');
const genreDAO = require('../models/DAO/genreDAO');

exports.genre_list = async function(req,res)
{
    const genreList = await genreDAO.get_genre_list();
    res.render('genres/list',{
        pageTitle: 'Danh sách thể loại',
        genreList: genreList
    })
};

exports.genre_add_get = function(req,res)
{
    res.render('genres/add', { pageTitle: 'Thêm thể loại'});
};

exports.genre_add_post = function(req,res) {
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        let genre = new Genre({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            info: req.body.info,
        });
        genre.save(function(error){
            if(error) throw error;
            res.redirect('list');
        });
    });
};

exports.genre_update_get = async function(req,res)
{
    const genre = await genreDAO.get_genre_by_id(req.params.id);
    res.render('genres/update',{
        pageTitle: 'Cập nhật thể loại',
        genre: genre
    })
};

exports.genre_update_post = function(req,res)
{
    var genre = new Genre({
        _id: req.params.id,
        name: req.body.name,
        info: req.body.info
    });

    Genre.findByIdAndUpdate(req.params.id,genre,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};

exports.genre_delete = function(req,res)
{
    var genre = new Genre({
        _id: req.params.id,
        isDeleted: true
    });

    Genre.findByIdAndUpdate(req.params.id,genre,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};