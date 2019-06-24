//Require mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    content: String,
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    },
    createdDate: {type: Date, default: Date.now()},
    isDeleted: {type: Boolean, default: false}
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
