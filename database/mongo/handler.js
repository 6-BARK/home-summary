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
  // let query = mongo.House.where({
  //   houseId: id
  // })
  // query.find((err, listing) => {
  //   if (err) {
  //     callback(err);
  //   }
  //   callback(null, listing)
  // })
  mongo.House.find({"houseId":id}, (error, house) => {
    if (error) {
      callback(error)
    }
    callback(null, house)
  }).limit(1);
}

const getAgent = (id, callback) => {
  let query = mongo.Agent.where({
    agentId: id
  })
  query.findOne((err, agent) => {
    if (err) {
      callback(err);
    }
    callback(null, agent);
  })
}

module.exports = {
  postListing,
  postAgent,
  getListing,
  getAgent
}