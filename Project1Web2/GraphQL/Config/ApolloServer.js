const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../Resolvers/index'); 
const { typeDefs } = require('../Schemas/index'); 

function createApolloServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            let user = null;
    
            if (token) {
                try {
                    user = jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
                } catch (err) {
                    // Token inválido
                }
            }
    
            return { user };
        }
    });
}

module.exports = createApolloServer;