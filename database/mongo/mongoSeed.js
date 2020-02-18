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

const seedHomes = () => {
  for (var i = 1; i < 6; i++) {
    let houseStats = getPriceAndType();
    let newHome = new Models.House({
      houseId: i,
      price: houseStats.price,
      bedCount: getRandomNumber(1, 10),
      bathCount: getRandomNumber(1, 10),
      sqft: houseStats.sqft,
      address: faker.fake("{{address.streetAddress}} {{address.secondaryAddress}}, {{address.city}}, {{address.stateAbbr}}") + " " + faker.fake("{{address.zipCode}}").substring(0,5),
      listingType: houseStats.listingType,
      zestimate: faker.fake("{{commerce.price}}") * (10 ** 4),
      estPayment: faker.fake("{{commerce.price}}"),
      primaryAgent: i,
      allAgents: []
    })
    return newHome.save();
  }
  return console.log("House listing data finished seeding.")
}

const seedAgents = () => {
  for (var i = 1; i < 100000; i++) {
    let random = getRandomNumber(1, 10);
    let agentType;
    if (random <= 3) {
      agentType = 'Seller\'s'
    } else {
      agentType = 'Premier'
    }
    let newAgent = new Models.Agent({
      agentId: i,
      agentName: faker.fake("{{name.firstName}} {{name.lastName}}"),
      agentType: agentType,
      starCount: getRandomNumber(1, 6),
      reviewCount: getRandomNumber(5, 1000),
      phoneNumber: faker.fake("{{phone.phoneNumber}}")
    })
    return newAgent.save();
  }
  return console.log("Agent data finished seeding.")
}

seedHomes();