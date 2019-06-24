const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
const Author = require('../models/author');
const authorDAO = require('../models/DAO/authorDAO');

exports.author_list = async function(req,res)
{
    const authorList = await authorDAO.get_author_list();
    res.render('authors/list',{
        pageTitle: 'Danh sách tác giả',
        authorList: authorList
    })
};

exports.author_add_get = function(req,res)
{
    res.render('authors/add', { pageTitle: 'Thêm tác giả'});
};

exports.author_add_post = function(req,res) {
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        let author = new Author({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            info: req.body.info,
        });
        author.save(function(error){
            if(error) throw error;
            res.redirect('list');
        });
    });
};

exports.author_update_get = async function(req,res)
{
    const author = await authorDAO.get_author_by_id(req.params.id);
    res.render('authors/update',{
        pageTitle: 'Cập nhật tác giả',
        author: author
    })
};

exports.author_update_post = function(req,res)
{
    var author = new Author({
        _id: req.params.id,
        name: req.body.name,
        info: req.body.info
    });

    Author.findByIdAndUpdate(req.params.id,author,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};

exports.author_delete = function(req,res)
{
    var author = new Author({
        _id: req.params.id,
        isDeleted: true
    });

    Author.findByIdAndUpdate(req.params.id,author,{},function(err){
        if(err){return next(err);}
        res.redirect('../list');
    })
};