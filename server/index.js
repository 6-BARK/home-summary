const express = require('express');
const port = 3002;
const path = require('path');

const retrieve = require('../database/retrieve.js'); // module for query a specific house in DB

// set up server
var app = express();
app.set('port', port);

// parsing
app.use(express.urlencoded({'extended': true}));

// specify the directory of static files
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.post('/api/summary/data/:id', (req, res) => {
  res.send('post request');
})

// response to request
app.get('/api/summary/data/:id', (req, res) =>{
  var {id} = req.params;
  retrieve(id, (err, data) =>{
    if (err) { // if error occures, send status code of 500
      console.log(err);
      res.send(500);
    } else {
      if(data){ // send data back to client if retrieved
        res.jsonp(data);
      } else { // if query succeed but no data retrieve, send message to client about issue
        res.send('no house with such id value');
      }
    }
  });
})

app.put('/api/summary/data/:id', (req, res) => {
  res.send('update request');
})

app.delete('/api/summary/data/:id', (req, res) => {
  res.send('delete request');
})

// start server
app.listen(port, () => {
  console.log('Listening on', port);
});

module.exports = app;