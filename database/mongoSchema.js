const mongoose = require('mongoose');
const Schema = new mongoose.Schema;

const houseSchema = new Schema({
  houseId: Number,          // listing id number
  price: Number,            // price in $
  bedCount: Number,         // #bedroom count
  bathCount: Number,        // #bathroom count
  sqft: Number,             // size of house in sqft
  address: String,          // address
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

const House = mongoose.model('houses', houseSchema);
const Agent = mongoose.model('agents', agentSchema);
const Contact = mongoose.model('contactRequests', contactSchema);
