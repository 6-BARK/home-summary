# AK-service

CRUD API Endpoint Functionality:
------------------------------------------------
Post - Sends new data on a NEW home to be stored in database

app.post('/api/summary/newListing', (req, res) => {
  req.body = {
    price: integer,
    bedCount: smallint,
    bathCount: smallint,
    address: string,
    listingType: string,
    zestimate: integer,
    estPayment: integer
  }
  res.send(${ Success or an error message })
})
------------------------------------------------
Get - grabs stored data on a home for the client to display

app.get('/api/summary/data/:id', (req, res) => {
  req.body = {none}
  res.send({
    price: integer,
    bedCount: smallint,
    bathCount: smallint,
    address: string,
    listingType: string,
    zestimate: integer,
    estPayment: integer
  })
})
------------------------------------------------
Put - Updates data on an existing home's dataset

app.put('/api/summary/data/:id', (req, res) => {
  var {id} = req.params;
  var newData = req.body;
  ${ db update query here using newData and id }
})
------------------------------------------------
Delete - Deletes a home's data from the database

app.delete('/api/summary/data/:id', (req, res) => {
  var {id} = req.params;
  ${ delete query for db here using house id } (
    res.send(${ success or error })
  )
})
------------------------------------------------