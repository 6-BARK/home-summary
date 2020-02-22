require('newrelic');
const express = require('express');
const port = 3002;
const path = require('path');
const controller = require('./controller.js');

const retrieve = require('../database/retrieve.js'); // module for query a specific house in DB

// set up server
var app = express();
app.set('port', port);
app.use(express.json());
// parsing
app.use(express.urlencoded({'extended': true}));

// specify the directory of static files
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// endpoint for adding new home listing
app.post('/api/listing', controller.handleNewListing);

// endpoint for adding new agent
app.post('/api/agents', controller.handleNewAgent);

// endpoint for getting a listings data
app.get('/api/listing/:id/data', controller.handleGetListing)

app.get('/api/agents/:id/data', controller.handleGetAgent)

app.put('/api/summary/data/:id', (req, res) => {
  // grab new data to use for the update
  // use a db function to query the update with new data
  // send back a success message or error
  res.send('update request');
})

app.delete('/api/summary/data/:id', (req, res) => {
  // grab ID from current home
  // call db function to delete that home from db
  res.send('delete request');
})

// start server
app.listen(port, () => {
  console.log('Listening on', port);
});

module.exports = app;