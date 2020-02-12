const House = require('./schema.js');
const mongoose = require('mongoose');
const faker = require('faker');       // module to generate fake information

const dbName = '7-xillow'       // database name
const nData = 100;              // number of data(document) to be seeded
const url = process.env.NODE_ENV === 'production' ? 'database' : 'localhost';


mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => { return House.countDocuments() })
  .then((number) => {
    if(number > 0) { // check if there is any previously seeded data
      House.deleteMany({}) // delete all previously seeded data
        .then(() => { saveNData(nData); }) // seed DB with n number of data
        .catch(()=> {console.log('Error in deleting previously generated data')})
    } else {
      saveNData(nData); // if there is no previously seeded data, just seed DB with n number of data
    }
  })


var saveNData = (n) => { //helper function for seeding n data into database
  console.log(`START: generating and inserting ${n} sample data of house to database (MongoDB)`);

  var temp = Array(n).fill(0);

  var promiseAll = Promise.all( // use promise
    temp.map((ele,i) => {
      var randomVal = Math.random(); // will be used to determine status value

      let property = new House({ // generate random information for each house(documnet)
        id: i+1,
        price: faker.fake("{{commerce.price}}") * (10 ** 4),
        bd: Math.ceil(Math.random() * 6),
        ba: Math.ceil(Math.random() * 7) / 2,
        sqft: faker.fake("{{random.number}}") % 2000,
        address: faker.fake("{{address.streetAddress}} {{address.secondaryAddress}}, {{address.city}}, {{address.stateAbbr}}") + " " + faker.fake("{{address.zipCode}}").substring(0,5),
        saleStatus: (randomVal < 5 / 6) ? 'For sale' :
                    (randomVal < 11 / 12) ? 'For rent' : 'Sold',
        tourButton: (Math.random() < 0.85),
        zestimate : faker.fake("{{commerce.price}}") * (10 ** 4),
        estPayment: faker.fake("{{commerce.price}}")
      });

      return property.save(); // save each property in table(collection) and return promise generated by save method
    })
  );

  promiseAll
    .then(() => { // check if every property document is saved in table(collection) 'summaries'
      console.log(`END: generating and inserting ${n} sample data`);
      mongoose.connection.close(); // close the connection to MongoDB
    })
    .catch((err) => {
      console.log(err);
    });
};