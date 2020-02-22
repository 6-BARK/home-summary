const helper = require('../database/mongo/handler.js');

const handleNewListing = (req, res) => {
  let data = req.body;
  helper.postListing(data , (error, data) => {
    if (error) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  })
}

const handleNewAgent = (req, res) => {
  let data = req.body;
  helper.postAgent(data, (error, data) => {
    if (error) {
      res.sendStatus(500)
    }
    res.sendStatus(200);
  });
}

module.exports = {
  handleNewListing,
  handleNewAgent
}