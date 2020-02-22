const mongoose = require('mongoose');
const Models = require('./mongoSchema.js');
const faker = require('faker');
const fs = require('fs');

const dbName = 'xillowDB';
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const getPriceAndType = () => {
  let result = {}
  let listingType = getRandomNumber(0,3);
  if (listingType === 1) {
    let price = getRandomNumber(500000, 10000000);
    result.listingType = "For Sale";
    result.price = price;
    result.sqft = getRandomNumber(1000, 5000);
    return result;
  } else if (listingType === 2) {
    let price = getRandomNumber(1000, 10000);
    result.listingType = "For Rent";
    result.price = price;
    result.sqft = getRandomNumber(250, 1000)
    return result;
  } else {
    let price = getRandomNumber(500000, 10000000);
    result.listingType = "Sold";
    result.price = price;
    result.sqft = getRandomNumber(1000, 5000);
    return result;
  }
}

const getRandomAgents = () => {
  let amount = getRandomNumber(1, 5);
  let result = [];
  for (var i = 0; i <= amount; i++) {
    result.push(getRandomNumber(1,1000001))
  }
  return result;
}

async function seedHomes(outer, inner) {
  let id = 1;
  for (var i = 0; i < outer; i++) {
    let data = [];
    for (var j = 0; j < inner; j++) {
      let houseStats = getPriceAndType();
      let newHome = {
        houseId: id,
        price: houseStats.price,
        bedCount: getRandomNumber(1, 10),
        bathCount: getRandomNumber(1, 10),
        sqft: houseStats.sqft,
        streetAddress: faker.fake("{{address.streetAddress}} {{address.secondaryAddress}}"),
        city: faker.fake("{{address.city}}"),
        state: faker.fake("{{address.stateAbbr}}"),
        zipCode: faker.fake("{{address.zipCode}}").substring(0,5),
        listingType: houseStats.listingType,
        zestimate: faker.fake("{{commerce.price}}") * (10 ** 4),
        estPayment: faker.fake("{{commerce.price}}"),
        primaryAgent: getRandomNumber(1, 1000001),
        allAgents: getRandomAgents()
      }
      data.push(newHome);
      id += 1;
    }
    await Models.House.insertMany(data);
    console.log(`Seeding data. Currently on :${id}`)
  }
  console.log("House listing data finished seeding.")
}

async function seedAgents(outer, inner) {
  let id = 1;
  for (var i = 0; i < outer; i++) {
    let data = [];
    for (var j = 0; j < inner; j++) {
      let random = getRandomNumber(1, 10);
      let agentType;
      if (random <= 3) {
        agentType = 'Seller\'s'
      } else {
        agentType = 'Premier'
      }
      let newAgent = {
        agentId: id,
        agentName: faker.fake("{{name.firstName}} {{name.lastName}}"),
        agentType: agentType,
        starCount: getRandomNumber(1, 6),
        reviewCount: getRandomNumber(5, 1000),
        phoneNumber: faker.fake("{{phone.phoneNumber}}")
      }
      data.push(newAgent);
      id += 1;
    }
    await Models.Agent.insertMany(data)
    console.log(`Seeding agent data. Currently on: ${id}`)
  }
  console.log("Agent data finished seeding.")
}

module.exports = {
  seedAgents,
  seedHomes
}
