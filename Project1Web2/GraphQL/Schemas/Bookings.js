const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Booking {
    id: ID!
    userId: ID!
    rideId: ID!
    status: String!  # Por ejemplo: 'pending', 'accepted', 'rejected'
  }

  input BookingInput {
    userId: ID!
    rideId: ID!
    status: String!
  }

  type Query {
    getBooking(id: ID!): Booking
    getBookings: [Booking]
    getBookingsByUser(userId: ID!): [Booking]
    getBookingsByRide(rideId: ID!): [Booking]
  }

  type Mutation {
    createBooking(input: BookingInput!): Booking
    updateBooking(id: ID!, status: String!): Booking
    deleteBooking(id: ID!): Booking
  }
`;

module.exports = typeDefs;