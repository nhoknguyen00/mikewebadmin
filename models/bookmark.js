//Require mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
