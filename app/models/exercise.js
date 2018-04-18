const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    userId: { type: String },
    userName: { type: String },
    description: { type: String, maxlength: 30 },
    duration: { type: Number, min: 0, max: 10000 },
    date: { type: Date, default: Date.now }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;