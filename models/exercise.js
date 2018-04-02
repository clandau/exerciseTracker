
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    userId: { type: string },
    description: string,
    duration: Number,
    date: { type: Date, default: Date.now }
});