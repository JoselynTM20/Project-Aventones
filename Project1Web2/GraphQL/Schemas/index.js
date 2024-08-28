const { gql } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');

// Definiciones de tipo individuales
const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    Lastname: String!
    email: String!
    password: String!
    cardIdNumber: String
    birthDate: String
    phoneNumber: String
  }

  extend type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  extend type Mutation {
    createUser(firstName: String!, lastName: String!, cardIdNumber: String, birthDate: String, email: String!, password: String!, phoneNumber: String): User
  }
`;

const driverTypeDefs = gql`
  type Driver {
    id: ID!
    name: String!
    licenseNumber: String!
    email: String!
    phoneNumber: String
  }

  extend type Query {
    getDrivers: [Driver]
    getDriver(id: ID!): Driver
  }

  extend type Mutation {
    createDriver(input: CreateDriverInput!): Driver
    updateDriver(id: ID!, input: UpdateDriverInput!): Driver
    deleteDriver(id: ID!): Driver
  }

  input CreateDriverInput {
    name: String!
    licenseNumber: String!
    email: String!
    password: String!
    phoneNumber: String
  }

  input UpdateDriverInput {
    name: String
    licenseNumber: String
    email: String
    phoneNumber: String
  }
`;

const rideTypeDefs = gql`
  type Ride {
    id: ID!
    driverId: ID!
    startLocation: String!
    endLocation: String!
    price: Float!
    userId: User
  }

  extend type Query {
    getRides: [Ride]
    getRide(id: ID!): Ride
    getRidesByDriver(userId: ID!): [Ride]
  }

  extend type Mutation {
    createRide(input: CreateRideInput!): Ride
    updateRide(id: ID!, input: UpdateRideInput!): Ride
    deleteRide(id: ID!): Ride
  }

  input CreateRideInput {
    driverId: ID!
    startLocation: String!
    endLocation: String!
    price: Float!
  }

  input UpdateRideInput {
    startLocation: String
    endLocation: String
    price: Float
  }
`;

const bookingsTypeDefs = gql`
  type Booking {
    id: ID!
    userId: ID!
    rideId: ID!
    status: String!
  }

  input BookingInput {
    userId: ID!
    rideId: ID!
    status: String!
  }

  extend type Query {
    getBooking(id: ID!): Booking
    getBookings: [Booking]
    getBookingsByUser(userId: ID!): [Booking]
    getBookingsByRide(rideId: ID!): [Booking]
  }

  extend type Mutation {
    createBooking(input: BookingInput!): Booking
    updateBooking(id: ID!, status: String!): Booking
    deleteBooking(id: ID!): Booking
  }
`;

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  userTypeDefs,
  driverTypeDefs,
  rideTypeDefs,
  bookingsTypeDefs
]);

module.exports = typeDefs;