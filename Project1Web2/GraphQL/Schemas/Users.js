const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    Lastname: String!
    cardIdNumber: String!
    BirthDate: String!
    email: String!
    password: String!
    phoneNumber: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(
      firstName: String!
      Lastname: String!
      cardIdNumber: String!
      BirthDate: String!
      email: String!
      password: String!
      phoneNumber: String!
    ): User
  }
`;

module.exports = typeDefs;