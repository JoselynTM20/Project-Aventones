const { mergeResolvers } = require('@graphql-tools/merge');
const userResolvers = require('./Users');
const driverResolvers = require('./Drivers');
const rideResolvers = require('./Rides');
const bookinsResolvers = require('./Bookings');

const resolvers = mergeResolvers([
  userResolvers,
  driverResolvers,
  rideResolvers,
  bookingsResolvers,
]);

module.exports = resolvers;