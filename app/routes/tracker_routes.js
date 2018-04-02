module.exports = function(app, db) {
    app.post('/api/exercise/new-user', (req, res) => {
        //add a new user
        res.send('new user requested'); 
        const user = { username: req.body.username };
        console.log(user);
    });

    app.post('/api/exercise/add', (req, res) => {
        //add an exercise
        const userId = req.body.userId;
        const description = req.body.description;
        const duration = req.body.duration;
        const date = req.body.date;
        res.send( {'userId': userId, 'description': description, 
        'duration' : duration, 'date': date });
        console.log(userId, description, duration, date);
    });

    app.get('/api/exercise/log/:userId', (req, res) => {
        res.send({userId: req.params.userId, dates: (req.query.from + ' to ' + req.query.to), limit: req.query.limit});
    }); 
};