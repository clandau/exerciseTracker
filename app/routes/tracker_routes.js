const Exercise = require('../models/exercise.js');
const User = require('../models/user.js');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/api/exercise/new-user', (req, res) => {
        //add a new user
        const user = req.body.username;
        //check db to see if user there, if so throw error
        User.findOne({'userName' : user}, (err, data) => {
        // Exercise.findOne({'userId' : user}, (err, data) => {
            if(err) console.log(err);
            else if(data !== null) {
                console.log('user exists');
                res.status(404).send('user already exists');
            }
            else {
                //add new user to database
                let newUser = new User({userName: user});
                // let newUser = new Exercise({userId: user});
                newUser.save((err, data) => {
                    if(err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    else {
                        res.status(200).
                        json({'user': data.userId, '_id':data._id});
                    }
                });
            }
        });        
    });

    app.post('/api/exercise/add', (req, res) => {
        //add exercise
        const userId = req.body.userId;
        const description = req.body.description;
        const duration = req.body.duration;
        let date = null;
        if(!req.body.date) {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            date = year + '-' + month + '-' + day;
            console.log(date);
        }
        else date = req.body.date;
        const exercise = { description : description, duration : duration, date : date};
        Exercise.findOneAndUpdate({userId: userId}, {$push: {exercises: exercise}}, {new:true}, (err, user) => {
            if(err) console.log(err);
            if(user === null) {
                console.log('user not found');
                res.status(404).send('user not found');
            }
            else {
                console.log('added to database');
                res.status(200).send(user);
            }
        });
    });

    // app.get('/api/exercise/log/:userId', (req, res) => {
    //     //req url ex: /api/exercise/log/userId?from=2011-01-01&to=2013-12-31&limit=10
    //     let id = req.params.userId;
    //     // let limit = parseInt(req.query.limit);
    //     let limit = 5;
    //     const query = Exercise.findOne({userId: id}).
    //         select('exercises').
    //         // sort('exercises.duration').
    //         // limit(limit).
    //         exec((err, data) => {
    //             if(err) console.log(err);
    //             //handle data
    //             let dateString = data.exercises[0].date.
    //                 toISOString().
    //                 substring(0, 10);
    //             const outputObj = {
    //                 user : id,
    //                 exercises : data.exercises,
    //                 total: data.exercises.length,
    //             }
    //             res.status(200).send(outputObj);
    //         });
    // });

    app.get('/api/exercise/log/:userId', (req, res) => {
        //req url ex: /api/exercise/log/userId?from=2011-01-01&to=2013-12-31&limit=10
        let id = req.params.userId;
        let limit = parseInt(req.query.limit);
        const from = new Date(req.query.from).toISOString();
        const to = new Date(req.query.to).toISOString();
        console.log(to, from);
        Exercise.find({userId: id},
            {'exercises.date' : {$gte: from, $lte : to }}).
            // select('exercises.date exercises.description exercises.duration').
            // where('exercises.date').lt(to).
            // gte(from).
            // sort('exercises.duration').
            // limit(limit).
            exec((err, data) => {
                if(err) console.log(err);
                //handle data
                // let dateString = data.exercises[0].date.
                //     toISOString().
                //     substring(0, 10);
                // const outputObj = {
                //     user : id,
                //     exercises : data.exercises,
                //     total: data.exercises.length,
                // }
                res.status(200).send(data);
            });
    });
}