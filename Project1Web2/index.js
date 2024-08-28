const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express'); // Importar ApolloServer de apollo-server-express

require('./BackEend/middleware/passport-setup');

// Crear aplicación Express
const app = express();

// Configuración de middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: '*',
}));

app.use(session({
    secret: 'sientre',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Conexión a la base de datos
mongoose.connect("mongodb+srv://JoselynTijerino:JoselynTijerino@cluster0.6sdzi3m.mongodb.net/users", {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Importar rutas y controladores
const authRoutes = require('./BackEend/routes/authRoutes');
const { authenticateToken } = require('./BackEend/middleware/authMiddleware');
const { login } = require('./BackEend/controllers/authControllers');

// Importar controladores REST
const { UserGet, UserPost } = require('./BackEend/controllers/usersControllers');
const { DriverPost, DriverGet } = require('./BackEend/controllers/driversControllers');
const { RidesDriverPost, RidesDriverGet, updateRideDriver, deleteRide, getRidesByDriver, RidesDriverGetById } = require('./BackEend/controllers/ridesControllers');
const { BookingPost, BookingGet, UpdateBooking, DeleteBooking } = require('./BackEend/controllers/BookingsControllers');

// Importar typeDefs y resolvers de GraphQL
const typeDefs = require('./GraphQL/Schemas/index');
const resolvers = require('./GraphQL/Resolvers/index');



// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: '*'
}));

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://lingama04:1234@cluster0.qlrltgq.mongodb.net/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Función para crear el servidor Apollo
function createApolloServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
    });
}

// Función asíncrona para inicializar servidores
async function startServers() {
    // Iniciar Apollo Server para GraphQL
    const apolloServer = createApolloServer();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // Rutas Públicas (no requieren autenticación)
    app.post('/api/login', login);
    app.post('/api/register', UserPost); // Ruta para registrar nuevos usuarios

    // Rutas Privadas (requieren autenticación)
    app.get('/api/user', UserGet);
    app.post('/api/user', UserPost);

    app.get('/api/driver', authenticateToken, DriverGet);
    app.post('/api/driver', DriverPost);

    app.get('/api/rides', authenticateToken, RidesDriverGet);
    app.post('/api/rides', authenticateToken, RidesDriverPost);
    app.put('/api/rides/:id', authenticateToken, updateRideDriver);
    app.delete('/api/rides/:id', authenticateToken, deleteRide);
    app.get('/api/rides/:id', authenticateToken, RidesDriverGetById);

    app.get('/api/bookings', authenticateToken, BookingGet);
    app.post('/api/bookings', authenticateToken, BookingPost);
    app.patch('/api/bookings/:id', authenticateToken, UpdateBooking);
    app.delete('/api/bookings/:id', authenticateToken, DeleteBooking);

    // Iniciar el servidor REST
    const restPort = 3001;
    app.listen(restPort, () => {
        console.log(`🚀 Servidor REST escuchando en http://localhost:${restPort}`);
    });

    // Iniciar el servidor de GraphQL en un puerto diferente
    const graphqlPort = 4000;
    app.listen(graphqlPort, () => {
        console.log(`🚀 Servidor GraphQL escuchando en http://localhost:${graphqlPort}${apolloServer.graphqlPath}`);
    });
}

// Iniciar ambos servidores
startServers().catch(err => {
    console.error('Error al iniciar los servidores:', err);
});
