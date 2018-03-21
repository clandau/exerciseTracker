module.exports = function(app, db) {
    app.post('/api/exercise/new-user', (req, res) => {
        //add a new user
        res.send('new user requested'); 
        const user = { username: req.body.username };
    });

    app.post('/api/exercise/add', (req, res) => {
        //add an exercise
        res.send('exercise add requested');
    });

    app.get('/api/exercise/log/:userId', (req, res) => {
        res.send({userId: req.params.userId, dates: (req.query.from + ' to ' + req.query.to), limit: req.query.limit});
    }); 
};