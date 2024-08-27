const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../Resolvers/index'); 
const { typeDefs } = require('../Schemas/index'); 

function createApolloServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            // Validar el token y retornar contexto si es necesario
            return { token };
        },
    });
}

module.exports = createApolloServer;