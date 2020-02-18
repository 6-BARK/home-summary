const mongoose = require('mongoose');
const Models = require('./mongoSchema.js');
const faker = require('faker');
const fs = require('fs');

const writeAgents = fs.createWriteStream('../../agents.csv');
writeAgents.write('agentId, agentName, agentType, starCount,reviewCount, phoneNumber\n', 'utf8');

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const writeManyAgents = (writer, encoding, callback) => {
  let i = 1000000;
  let agentId = 0;

  const write = () => {
    let ok = true;
    do {
      let random = getRandomNumber(1, 10);
      let agentT;
      if (random <= 3) {
        agentT = 'Seller\'s'
      } else {
        agentT = 'Premier'
      }
      i -= 1;
      agentId += 1;
      const agentName = faker.fake("{{name.firstName}} {{name.lastName}}");
      const agentType = agentT;
      const starCount = getRandomNumber(1, 6);
      const reviewCount = getRandomNumber(5, 1000);
      const phoneNumber = faker.fake("{{phone.phoneNumber}}");
      const data = `${agentId}, ${agentName}, ${agentType}, ${starCount}, ${reviewCount}, ${phoneNumber}\n`;

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

writeManyAgents(writeAgents, 'utf-8', () => {
  writeAgents.end();
});