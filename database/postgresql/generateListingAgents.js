const faker = require('faker');
const fs = require('fs');

const writeListingAgents = fs.createWriteStream('../../listings.csv');
writeListingAgents.write('agentId, houseId\n', 'utf8');

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const writeManyListings = (writer, encoding, callback) => {
  let i = 15000000;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const agentId = getRandomNumber(1, 1000001);
      const houseId = getRandomNumber(1, 10000001);
      const data = `${agentId},${houseId}\n`;
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

writeManyListings(writeListingAgents, 'utf-8', () => {
  writeListingAgents.end();
});