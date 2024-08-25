const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Vehicle {
    make: String!
    model: String!
    year: Int!
  }

  type Ride {
    id: ID!
    departureFrom: String!
    arriveTo: String!
    days: [String!]!
    time: String!
    seats: Int!
    fee: Float!
    vehicle: Vehicle!
    userId: ID!  # Referencia al ID del conductor
  }

  input VehicleInput {
    make: String!
    model: String!
    year: Int!
  }

  input RideInput {
    departureFrom: String!
    arriveTo: String!
    days: [String!]!
    time: String!
    seats: Int!
    fee: Float!
    vehicle: VehicleInput!
    userId: ID!
  }

  type Query {
    getRide(id: ID!): Ride
    getRides: [Ride]
    getRidesByDriver(userId: ID!): [Ride]
  }

  type Mutation {
    createRide(input: RideInput!): Ride
    updateRide(id: ID!, input: RideInput!): Ride
    deleteRide(id: ID!): Ride
  }
`;

module.exports = typeDefs;