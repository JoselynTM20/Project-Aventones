const { mergeResolvers } = require('@graphql-tools/merge');
const userResolvers = require('./Users');
const driverResolvers = require('./Drivers');
const rideResolvers = require('./Rides');
const bookingResolvers = require('./Bookings');

const resolvers = mergeResolvers([
  userResolvers,
  driverResolvers,
  rideResolvers,
  bookingResolvers,
]);

module.exports = resolvers;