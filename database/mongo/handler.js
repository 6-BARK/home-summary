const mongoose = require('mongoose');
const mongo = require('./mongoSchema.js');
const db = require('./db.js');

const postListing = (data , callback) => {
  let newListing = new mongo.House(data)
  newListing.save(() => {
    callback(null, newListing);
  });
}

const postAgent = (data, callback) => {
  let newAgent = new mongo.Agent(data);
  newAgent.save(() => {
    callback(null, newAgent);
  })
}

const getListing = (id, callback) => {
  let query = mongo.House.where({
    houseId: id
  })
  query.findOne((err, listing) => {
    if (err) {
      callback(err);
    }
    if (listing === null) {
      callback(null, 'No such home listing.');
    } else {
      callback(null, listing);
    }
  })
}

const getAgent = (id, callback) => {
  let query = mongo.Agent.where({
    agentId: id
  })
  query.findOne((err, agent) => {
    if (err) {
      callback(err);
    }
    if (agent === null) {
      callback(null, 'No matching agent.');
    } else {
      callback(null, agent);
    }
  })
}

module.exports = {
  postListing,
  postAgent,
  getListing,
  getAgent
}