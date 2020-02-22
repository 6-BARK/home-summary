const mongoose = require('mongoose');
const Models = require('./mongoSchema.js');
const faker = require('faker');
const fs = require('fs');

const writeHomes = fs.createWriteStream('../../homesPsql.csv');
writeHomes.write('houseId, price, bedCount, bathCount, sqft, streetAddress, city, state, zipCode, listingType, zestimate, estPayment, primaryAgent, allAgents\n', 'utf8');

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

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomAgents = () => {
  let amount = getRandomNumber(1, 5);
  let result = [];
  for (var i = 0; i <= amount; i++) {
    result.push(getRandomNumber(1,1000001))
  }
  return result;
}

const writeTenMillionHomes = (writer, encoding, callback) => {
  let i = 10000000;
  let houseId = 0;

  const write = () => {
    let ok = true;
    do {
      let houseStats = getPriceAndType();
      i -= 1;
      houseId += 1;
      const price = houseStats.price;
      const bedCount = getRandomNumber(1, 10);
      const bathCount = getRandomNumber(1, 10);
      const sqft = houseStats.sqft;
      const streetAddress = faker.fake("{{address.streetAddress}} {{address.secondaryAddress}}");
      const city = faker.fake("{{address.city}}");
      const state = faker.fake("{{address.stateAbbr}}");
      const zipCode = faker.fake("{{address.zipCode}}").substring(0,5);
      const listingType = houseStats.listingType;
      const zestimate = faker.fake("{{commerce.price}}") * (10 ** 4);
      const estPayment = faker.fake("{{commerce.price}}");
      const primaryAgent = getRandomNumber(1, 1000001);
      const allAgents = getRandomAgents();
      const data = `${houseId},${price},${bedCount},${bathCount},${sqft},${streetAddress},${city},${state},${zipCode},${listingType},${zestimate},${estPayment},${primaryAgent},${allAgents}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionHomes(writeHomes, 'utf-8', () => {
  writeHomes.end();
});
