# AK-service

CRUD API Endpoint Functionality:
------------------------------------------------
Post - Sends new data on a NEW home or agent to be stored in database

// Post a new home
app.post('/api/summary/newListing', (req, res) => {
  req.body = {
    houseId: integer(auto incrememnt),
    price: integer,
    bedCount: smallint,
    bathCount: smallint,
    address: text,
    listingType: text,
    zestimate: integer,
    estPayment: integer
  }
  res.send(${ Success or an error message })
})

// Post a new agent's information to database
app.post('/api/agents', (req, res) => {
  req.body = {
    agentId: integer,
    agentName: text,
    agentType: text,
    starCount: smallint,
    reviewCount: smallint,
    phoneNumber: text,
  }
  res.send(${ Success or an error message })
})

// Post an agent to a house listing
app.post('/api/listingAgent', (req, res) => {
  req.body = {
    houseId: integer (reference House info table),
    agentId: integer (reference Agent Info table)
  }
  res.send(${ Success or an error message })
})
------------------------------------------------
Get - grabs stored data on a home for the client to display

app.get('/api/summary/data/:id', (req, res) => {
  req.body = {none}
  res.send({
    houseId: integer(auto increment),
    price: integer,
    bedCount: smallint,
    bathCount: smallint,
    address: text,
    listingType: text,
    zestimate: integer,
    estPayment: integer
  })
})
------------------------------------------------
Put - Updates data on an existing home's dataset

// Updates a homes data in database
app.put('/api/summary/data/:id', (req, res) => {
  var {id} = req.params;
  var newData = req.body;
  ${ db update query here using newData and id } (
    res.send({ Success or error })
  )
})

// Updates an agents information in database
app.put('/api/agents/:id', (req, res) => {
  var {id} = req.params;
  var newData = req.body;
  ${ db update query here } (
    res.send({ Success or error })
  )
})
------------------------------------------------
Delete - Deletes a home's data from the database

// Deletes a home listing from database
app.delete('/api/summary/data/:id', (req, res) => {
  var {id} = req.params;
  ${ delete query for db here using house id } (
    res.send(${ success or error })
  )
})

// Deletes an agents info from database
app.delete('/api/agents/:agentId, (req, res) => {
  var {agentId} = req.params;
  ${ delete query here } (
    res.send({ Success or error })
  )
})

// Deletes an agent from a houses listing
app.delete('/api/listingAgent/:houseId', (req, res) => {
  var {houseId} = req.params;
  ${ delete query here } (
    res.send({ Success or error })
  )
})
------------------------------------------------