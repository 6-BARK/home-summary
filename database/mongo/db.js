const mongoose = require('mongoose');

const dbName = 'xillowDB';
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo Database!')
});
