const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Library');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String
});

var Userdata = mongoose.model('user', NewUserSchema);                        

module.exports = Userdata;