const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    //username must be between 1-20 chars in length
    userName: { type: String, required: true, trim: true, match:  /^.{1,20}$/}
});

const User = mongoose.model('User', userSchema);