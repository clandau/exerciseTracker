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

    app.get('/api/exercise/log?{userId}[&from][&to][&limit]', (req, res) => {
        res.send('get log requested');
    }); 
};