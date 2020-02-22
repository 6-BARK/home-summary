const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  houseId: Number,          // listing id number
  price: Number,            // price in $
  bedCount: Number,         // #bedroom count
  bathCount: Number,        // #bathroom count
  sqft: Number,             // size of house in sqft
  streetAddress: String,    // street of the home
  city: String,             // city of the home
  state: String,            // state of the home
  zipCode: String,          // zipcode of the home
  listingType: String,      // (one of 'for sale', 'for rent', 'sold')
  zestimate : Number,       // price in $
  estPayment: Number,       // price in $
  primaryAgent: Number,     // agent id number
  allAgents: []             // array of agent id numbers assigned to this home
});

const agentSchema = new Schema({
  agentId: Number,      // agent id number
  agentName: String,    // agent name
  agentType: String,    // type of agent, (Premier or Seller's)
  starCount: Number,    // rating based on reviews, 1-5 stars
  reviewCount: Number,  // number of reviews agent has
  phoneNumber: String   // phone number of agent
})

const contactSchema = new Schema({
  requestId: Number,        // request id for specific inquiry
  houseId: Number,          // house id of home
  agentId: Number,          // agent id for contact
  customerName: String,     // customer's name
  customerPhone: String,    // customer's phone number
  customerMessage: String   // customer's message in request
})

const houseCounter = new Schema({
  id: String,
  sequence_value: Number
})

const House = mongoose.model('houses', houseSchema);
const Agent = mongoose.model('agents', agentSchema);
const Contact = mongoose.model('contactRequests', contactSchema);
const Counter = mongoose.model('counters', houseCounter);

module.exports = {
  House,
  Agent,
  Contact,
  Counter
}