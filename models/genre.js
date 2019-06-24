const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    info: String,
    isDeleted:{type: Boolean, default:false}
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;