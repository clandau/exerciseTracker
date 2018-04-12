const Exercise = require('../models/exercise.js');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/api/exercise/new-user', (req, res) => {
        //add a new user
        const user = req.body.username;
        console.log('new user requested', user); 
        //check db to see if user there, if so throw error
        Exercise.findOne({'userId' : user}, (err, data) => {
            if(err) console.log(err);
            else if(data !== null) {
                console.log('user exists');
                res.status(404).send('user already exists');
            }
            else {
                //add new user to database
                console.log('entering new user into DB');
                let newUser = new Exercise({userId: user});
                newUser.save((err, data) => {
                    err ? console.log(err) : console.log(data);
                });
                res.status(200).send(user);
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

    app.get('/api/exercise/log/:userId', (req, res) => {
        //req url ex: /api/exercise/log/userId?from=2011-01-01&to=2013-12-31&limit=10
        let id = req.params.userId;
        let limit = req.query.limit;
        Exercise.findOne({userId: id}).
            select('exercises').
            exec((err, data) => {
                if(err) console.log(err);
                //handle data
                // console.log(data.exercises[0].date);
                console.log(data.exercises.length);
                const outputObj = {
                    user : id,
                    from:  "date",
                    to: "date",
                    exercise:  'description goes here', //exercise here
                    total: data.exercises.length,
                }
                res.status(200).json(outputObj);
            })
        if(!req.query.from && !req.query.to) {
            if(!limit) {
                //show everything 
            }
            else {

            }
        }
        //res.send({userId: req.params.userId, dates: (req.query.from + ' to ' + req.query.to), limit: req.query.limit});
    }); 
};