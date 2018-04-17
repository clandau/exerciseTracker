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
            if(err) console.log(err);
            else if(data !== null) {
                res.status(404).send('user already exists');
            }
            else {
                //add new user to database
                let newUser = new User({userName: user});
                newUser.save((err, data) => {
                    if(err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    else {
                        res.status(200).
                        json({'userName': data.userName, '_id':data._id});
                    }
                });
            }
        });        
    });

    app.post('/api/exercise/add', (req, res) => {
        //add exercise
        if(!req.body.userId) return res.send("no user entered");   
        if(!req.body.description) return res.send('no description entered');
        if(!req.body.duration) return res.send('no duration entered');
        const userId = req.body.userId; 
        const description = req.body.description;
        const duration = req.body.duration;
        let date;
        User.findOne({'userName' : userId }, (err, user) => {
            if(err) console.log(err);
            else if(user === null) {
                res.status(404).send('user does not exist');
            }
            else {
                if(!req.body.date) {
                    var dateObj = new Date();
                    var month = dateObj.getUTCMonth() + 1;
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();
                    date = year + '-' + month + '-' + day;
                }
                else date = req.body.date;
                const exercise = { userId : user._id , userName : user.userName, description : description, duration : duration, date : date};
                let newExercise = new Exercise(exercise);
                newExercise.save((err, data) => {
                    if(err) return res.status(500).send(err);
                    else {
                        res.status(200).
                        json({ userId : data._id, userName : user.userName, description : data.description, duration : data.duration, date : data.date});
                    }
                });
            }
        });
    });

    app.get('/api/exercise/log/:userId', (req, res) => {
        //req url ex: /api/exercise/log/userId?from=2011-01-01&to=2013-12-31&limit=10
        let id = req.params.userId;
        let limit = parseInt(req.query.limit);
        let to, from;
        if(req.query.from) {
            from = new Date(req.query.from).toISOString();
        }
        if(req.query.to) {
            to = new Date(req.query.to).toISOString();
        }
        //find user 
        User.findOne({'userName' : id }, (err, user) => {
            if(err) console.log(err);
            else if(user === null) {
                res.status(404).send('user does not exist');
            }
            else {
                Exercise.find({
                    userId: user._id,
                    date: {
                        $lt: to ? to : Date.now(),
                        $gt: from ? from  : 0 
                                           
                    }
                })
                    .limit(limit)
                    .sort('date')
                    .exec((err, exercises) => {
                        if(err) return console.log(err);
                        let exerciseLog = {
                            _id : user._id,
                            username : user.userName,
                            from : from ? from : 'undefined',
                            to : to ? to : 'undefined',
                            log : exercises.map(ex => ({
                                    description : ex.description,
                                    date: ex.date, 
                                    duration: ex.duration      
                                })
                            ),
                            count : exercises.length
                        };
                        res.json(exerciseLog);
                });
            }
        });
    });

    app.get('/api/exercise/users', (req, res) => {
        //get all users in an array
        User.find({}, (err, users) => {
            return err ? console.log(err) : res.status(200).json(users);
        });
    });
}   