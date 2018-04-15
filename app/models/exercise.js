const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    userId: { type: String },
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now }
});

//decided to embed exercise activities inside one schema vs separating them out
// const exerciseSchema = new Schema({
//     userName : String,
//     userId: { 
//         type: String,
//         ref: 'User',
//     },
//     exercises: [
//         {
//             description: String,
//             duration: Number,
//             date: { type: Date, default: Date.now }
//         }
//     ]
// });

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;