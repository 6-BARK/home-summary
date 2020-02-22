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

module.exports = {
  postListing,
  postAgent
}