const mongoose = require('mongoose');
const info = require('./mongoAuth.js');

const dbName = 'xillowDB';
mongoose.connect(`mongodb://${info.user}:${info.pass}@52.53.160.171:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo Database!')
});

module.exports = {
  db
}
