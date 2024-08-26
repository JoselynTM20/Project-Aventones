const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Driver {
    id: ID!
    firstName: String!
    Lastname: String!
    cardIdNumber: String!
    BirthDate: String!
    email: String!
    phoneNumber: String!
    carBrand: String!
    carModel: String!
    carYear: Int!
    licensePlate: String!
  }

  input DriverInput {
    firstName: String!
    Lastname: String!
    cardIdNumber: String!
    BirthDate: String!
    email: String!
    password: String!
    phoneNumber: String!
    carBrand: String!
    carModel: String!
    carYear: Int!
    licensePlate: String!
  }

  type Query {
    getDriver(id: ID!): Driver
    getDrivers: [Driver]
  }

  type Mutation {
    createDriver(input: DriverInput!): Driver
    updateDriver(id: ID!, input: DriverInput!): Driver
    deleteDriver(id: ID!): Driver
  }
`;

module.exports = typeDefs;