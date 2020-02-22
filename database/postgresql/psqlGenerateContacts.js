const faker = require('faker');
const fs = require('fs');

const writeContacts = fs.createWriteStream('../../contacts.csv');
writeContacts.write('requestId, agentId, houseId, customerName, customerPhone, customerMessage\n', 'utf8');

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomMessage = () => {
  const messages = [
    'Hello! I\'d like to look at the home!',
    'How old is this home?',
    'Can I schedule a call to ask some questions?',
    'Can I call to put in an offer?',
    'Can I have more information on neighborhood?',
    'What hardwood is installed inside?'
  ]
  let random = getRandomNumber(0,6)
  return messages[random];
}

const writeManyContacts = (writer, encoding, callback) => {
  let i = 1000;
  let requestId = 0;

  const write = () => {
    let ok = true;
    do {
      i -= 1;
      requestId += 1;
      const agentId = getRandomNumber(1, 1000001);
      const houseId = getRandomNumber(1, 10000001);
      const customerName = faker.fake("{{name.firstName}} {{name.lastName}}");
      const customerPhone = faker.fake("{{phone.phoneNumber}}");
      const customerMessage = getRandomMessage();
      const data = `${requestId},${agentId},${houseId},${customerName},${customerPhone},${customerMessage}\n`;

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

writeManyContacts(writeContacts, 'utf-8', () => {
  writeContacts.end();
});