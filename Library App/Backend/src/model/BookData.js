const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Library');
const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    bookName: String,
    bookAuthor: String,
    description: String,
    imageUrl: String
});

var Bookdata = mongoose.model('book', NewBookSchema);                        

module.exports = Bookdata;