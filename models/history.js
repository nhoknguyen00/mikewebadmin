//Require mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const historySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {type: Date, default: Date.now() }
});

const History = mongoose.model('History', historySchema);

module.exports = History;
