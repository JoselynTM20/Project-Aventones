const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./GraphQL/schema'); // Define tu esquema y resolvers de GraphQL

// Crear una instancia de Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Aquí podrías manejar la autenticación si fuera necesario
        const token = req.headers.authorization || '';
        // Validar el token si es necesario y retornar contexto
        return { token };
    },
});

// Aplicar Apollo Server como middleware de Express
server.start().then(res => {
    server.applyMiddleware({ app });
    console.log(`🚀 Servidor GraphQL listo en http://localhost:${port}${server.graphqlPath}`);
});

// Iniciar el servidor Express
const port = 3001;
app.listen(port, () => console.log(`Servidor REST y GraphQL escuchando en puerto ${port}!`));