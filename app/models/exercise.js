const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    userId: { type: String },
    userName: { type: String },
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;