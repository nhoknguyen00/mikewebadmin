var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

//Controllers
var userController = require('../controllers/userController');
var authorController = require('../controllers/authorController');
var genreController = require('../controllers/genreController');
var storyController = require('../controllers/storyController');
var chapterController = require('../controllers/chapterController');

//User
router.get('/users/list',userController.user_list);
router.get('/users/delete/:id',userController.user_delete);

//Author
router.get('/authors/list',authorController.author_list);
router.get('/authors/add',authorController.author_add_get);
router.post('/authors/add',authorController.author_add_post);
router.get('/authors/update/:id',authorController.author_update_get);
router.post('/authors/update/:id',authorController.author_update_post);
router.get('/authors/delete/:id',authorController.author_delete);

//Genre
router.get('/genres/list',genreController.genre_list);
router.get('/genres/add',genreController.genre_add_get);
router.post('/genres/add',genreController.genre_add_post);
router.get('/genres/update/:id',genreController.genre_update_get);
router.post('/genres/update/:id',genreController.genre_update_post);
router.get('/genres/delete/:id',genreController.genre_delete);

//Story
router.get('/stories/list',storyController.story_list);
router.get('/stories/list/genre/:id',storyController.story_list_by_genre);
router.get('/stories/list/author/:id',storyController.story_list_by_author);
router.get('/stories/add',storyController.story_add_get);
router.post('/stories/add',storyController.story_add_post);
router.get('/stories/update/:id',storyController.story_update_get);
router.post('/stories/update/:id',storyController.story_update_post);
router.get('/stories/delete/:id',storyController.story_delete);

//Chapter
router.get('/chapters/list',chapterController.chapter_list);
router.get('/chapters/list/:id',chapterController.chapter_list_by_story);
router.get('/chapters/add',chapterController.chapter_add_get);
router.post('/chapters/add',chapterController.chapter_add_post);
router.get('/chapters/update/:id',chapterController.chapter_update_get);
router.post('/chapters/update/:id',chapterController.chapter_update_post);
router.get('/chapters/delete/:id',chapterController.chapter_delete);

module.exports = router;
