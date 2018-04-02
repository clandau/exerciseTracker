module.exports = function(app, db) {
    app.post('/api/exercise/new-user', (req, res) => {
        //add a new user
        console.log('new user requested'); 
        const user = req.body.username;
        //check db to see if user there, if so throw error
        //then add new user to db

        res.send(user);
    });

    app.post('/api/exercise/add', (req, res) => {
        //add an exercise
        const userId = req.body.userId;
        const description = req.body.description;
        const duration = req.body.duration;
        const date = req.body.date;
        const exercise = res.send( {'userId': userId, 'description': description,
        'duration' : duration, 'date': date });
        console.log(exercise);
    });

    app.get('/api/exercise/log/:userId', (req, res) => {
        res.send({userId: req.params.userId, dates: (req.query.from + ' to ' + req.query.to), limit: req.query.limit});
    }); 
};