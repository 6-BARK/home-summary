const helper = require('../database/mongo/handler.js');

// Adding new home listing
const handleNewListing = (req, res) => {
  let data = req.body;
  helper.postListing(data , (error, data) => {
    if (error) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  })
}
// Adding new agent
const handleNewAgent = (req, res) => {
  let data = req.body;
  helper.postAgent(data, (error, data) => {
    if (error) {
      res.sendStatus(500)
    }
    res.sendStatus(200);
  });
}
// Assigning agent to listing
const handleAssign = (req, res) => {
  let data = req.body;

}
// Get listing data
const handleGetListing = (req, res) => {
  let id = (req.params).id;
  helper.getListing(id, (err, listing) => {
    if (err) {
      res.sendStatus(500);
    }
    if (listing === null) {
      res.status(200).send('No such listing!');
    } else {
      res.status(200).send(listing);
    }
  })
}
//Get agent data
const handleGetAgent = (req, res) => {
  let id = (req.params).id;
  helper.getAgent(id, (err, agent) => {
    if (err) {
      res.sendStatus(500);
    }
    if (agent === null) {
      res.status(200).send('No agent found!');
    } else {
      res.status(200).send(agent)
    }
  })
}

module.exports = {
  handleNewListing,
  handleNewAgent,
  handleGetListing,
  handleGetAgent
}