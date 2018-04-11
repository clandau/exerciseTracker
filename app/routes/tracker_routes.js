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
                res.send('user "' + user + '" already exists in database');
            }
            else {
                //add new user to database
                console.log('entering new user into DB');
                let newUser = new Exercise({userId: user});
                newUser.save((err, data) => {
                    err ? console.log(err) : console.log(data);
                });
                res.send(user);
            }
        });        
    });

    app.post('/api/exercise/add', (req, res) => {
        const userId = req.body.userId;
        const description = req.body.description;
        const duration = req.body.duration;
        const date = req.body.date;
        const exercise = { description : description, duration : duration, date : date};
        Exercise.findOneAndUpdate({userId: userId}, {$push: {exercises: exercise}}, (err, user) => {
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
        res.send({userId: req.params.userId, dates: (req.query.from + ' to ' + req.query.to), limit: req.query.limit});
    }); 
};