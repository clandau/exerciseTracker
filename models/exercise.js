const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const exerciseSchema = new Schema({
//     userId: { type: string },
//     description: string,
//     duration: Number,
//     date: { type: Date, default: Date.now }
// });


//decided to embed exercise activities inside one schema vs separating them out
const exerciseSchema = new Schema({
    userId: { type: string },
    exercises: [
        {
            description: string,
            duration: Number,
            date: { type: Date, default: Date.now }
        }
    ]
})

mongoose.model('Exercise', exerciseSchema);