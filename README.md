# AK-service

CRUD API Endpoint Functionality:
------------------------------------------------
Post Requests:
  - Adding new home listings
  - Adding a new agent
  - Assigning an agent to a listing
  - Requesting contact with an agent for a listing

!!! NOTE, Primary agent's ID will be required for creating a listing.
If agent does not have an ID, create the agent's information first with API endpoint below.

// Creating a new home listing
  - Endpoint: '/api/listing'
  - REQUIRED body information:
    { houseId: integer(auto incrememnt, not null) ,
      price: integer not null,
      bedCount: smallint not null,
      bathCount: smallint not null,
      address: text not null,
      sqft: interger not null,
      listingType: text not null,
      zestimate: integer not null,
      estPayment: integer not null,
      primaryAgent: integer (agentId) }
  - Response expected:
    A success message:
    'Listing successfully created'
    or error message & code:
    'ERROR CODE, something went wrong! Please try again.'

// Creating a new agent
  - Endpoint: '/api/agents'
  - REQUIRED body information:
    { agentId: integer not null,
      agentName: text not null,
      agentType: text not null,
      starCount: smallint not null,
      reviewCount: smallint not null,
      phoneNumber: text not null }
  - Response expected:
    A success message:
    'Agent successfully added'
    or error message & code:
    'ERROR CODE, something went wrong! Please try again.'

// Assigning an agent to a house listing
  - Endpoint: '/api/listingAgent'
  - REQUIRED body information:
  { houseId: integer not null,
    agentId: integer not null }
  - Response expected:
    A success message:
    'Agent successfully added'
    or error message & code:
    'ERROR CODE, something went wrong! Please try again.'

// Requesting contact with an agent for a listing
  - Endpoint: '/api/listing/:id/agent/:agentId/contact'
    - {id} specifies which listing
    - {agentId} specifies which agent you'd like to contact
  - REQUIRED body information:
  { requestId: integer,
    houseId: integer
    agentId: integer,
    customerName: text,
    customerPhone: text,
    customerMessage: text }
  - Response expected:
    - A success or error message

------------------------------------------------
Get Requests:
  - Getting a house listing's information

// Getting a house listing's information
  - Endpoint: '/api/listing/:id/data'
    - {id} specifies which listing's data you are requesting
  - Request body not required or needed
  - Response expected:
    - A JSON object with the following fields (All fields will have values):
  { houseId: integer(auto increment),
    price: integer,
    bedCount: smallint,
    bathCount: smallint,
    address: text,
    sqft: interger,
    listingType: text,
    zestimate: integer,
    estPayment: integer,
    primaryAgent: integer (agentId) }

------------------------------------------------
Put Requests:
  - Updating a home listing's information
  - Updating an agent's information

!!! NOTE, if you want to update which agents are assigned to a listing:
  - To ASSIGN: use a POST request above that assigns an agent to a listing
  - To DELETE: use a delete request below that will remove an agent from a listing

// Updating a home listing's information
  - Endpoint: '/api/agent/:agentId/listing/:id/data'
    - {agentId} needs to be the ID of the listings PRIMARY agent for updating
    - {id} specifies which listing's data you are requesting to update
  - Request body options:
  { price: integer,
    bedCount: smallint,
    bathCount: smallint,
    address: text,
    sqft: interger,
    listingType: text,
    zestimate: integer,
    estPayment: integer }
  - Response expected:
    - A success or error message

// Updates an agents information in database
  - Endpoint: '/api/agents/:id'
    - {id} specifies which agent's information you'd like to update
  - Request body options:
    { agentId: integer not null,
      agentName: text not null,
      agentType: text not null,
      starCount: smallint not null,
      reviewCount: smallint not null,
      phoneNumber: text not null }
  - Response expected:
    - A success or error message

------------------------------------------------
Delete - Deletes a home's data from the database

// Deletes a home listing from database
  - Endpoint: '/api/agent/:agentId/listing/:id/data'
    - {agentId} needs to be the ID of the listings PRIMARY agent for deleting
    - {id} specifies which listing's data you are requesting to delete
  - Request body not required or needed
  - Response expected:
    - A success or error message

// Deletes an agents info from database
  - Endpoint: '/api/agents/:id/account/'
    - {id} specifies which agent's data you are requesting to delete
  - Request body not required or needed
  - Response expected:
    - A success or error message

// Deletes an agent from a houses listing
  - Endpoint: '/api/listing/:id/agents/:agentId'
    - {id} specifies which listing you need to remove an agent from
    - {agentId} specifies which agent you are removing from the listing
  - Request body not required or needed
    - A success or error message
------------------------------------------------