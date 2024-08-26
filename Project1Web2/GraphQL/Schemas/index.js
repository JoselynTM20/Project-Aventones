const { gql } = require('apollo-server-express');
const userTypeDefs = require('./Users');
const driverTypeDefs = require('./Drivers');
const rideTypeDefs = require('./Rides');
const rideTypeDefs = require('./Bookings');

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  driverTypeDefs,
  rideTypeDefs,
  bookingsTypeDefs
];

module.exports = typeDefs;