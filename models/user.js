const mongoose = require('mongoose');
const passportLocaleMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocaleMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;