//master route file, import other route files 
const trackerRoutes = require('./tracker_routes');

module.exports = function(app, db) {
    trackerRoutes(app, db);
}