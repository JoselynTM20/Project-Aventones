const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
<<<<<<< HEAD
const path = require('path'); // Importar el módulo path
const app = express();
import { ApolloProvider } from '@apollo/client';
import client from './GraphQL/Config/ApolloClient';  // Importa el archivo de configuración
=======
const { ApolloServer } = require('apollo-server-express'); // Importar ApolloServer de apollo-server-express
>>>>>>> 18edf0cdbc37884910c9921efa856746eb6ab676

require('./BackEend/middleware/passport-setup');

// Configura Express para servir archivos estáticos desde la carpeta 'views'
app.use(express.static(path.join(__dirname, 'views')));

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

<<<<<<< HEAD
// Rutas de autenticación con Google
app.use('/api', authRoutes);
=======
// Importar typeDefs y resolvers de GraphQL
const typeDefs = require('./GraphQL/Schemas/index');
const resolvers = require('./GraphQL/Resolvers/index');

// Crear aplicación Express
const app = express();

// Middleware
>>>>>>> 18edf0cdbc37884910c9921efa856746eb6ab676
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: '*'
}));

<<<<<<< HEAD
// Para la conexión a la base de datos

/*mongoose.connect("mongodb+srv://lingama04:1234@cluster0.qlrltgq.mongodb.net/users", {
=======
// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://lingama04:1234@cluster0.qlrltgq.mongodb.net/users", {
>>>>>>> 18edf0cdbc37884910c9921efa856746eb6ab676
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));*/

<<<<<<< HEAD
mongoose.connect("mongodb+srv://JoselynTijerino:JoselynTijerino@cluster0.6sdzi3m.mongodb.net/users", {
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
=======
// Función para crear el servidor Apollo
function createApolloServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
    });
}
>>>>>>> 18edf0cdbc37884910c9921efa856746eb6ab676

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

<<<<<<< HEAD
// Rutas Privadas (requieren autenticación)
app.get('/api/user', UserGet);
app.post('/api/user', UserPost);
=======
    app.get('/api/rides', authenticateToken, RidesDriverGet);
    app.post('/api/rides', authenticateToken, RidesDriverPost);
    app.put('/api/rides/:id', authenticateToken, updateRideDriver);
    app.delete('/api/rides/:id', authenticateToken, deleteRide);
    app.get('/api/rides/:id', authenticateToken, RidesDriverGetById);
>>>>>>> 18edf0cdbc37884910c9921efa856746eb6ab676

    app.get('/api/bookings', authenticateToken, BookingGet);
    app.post('/api/bookings', authenticateToken, BookingPost);
    app.patch('/api/bookings/:id', authenticateToken, UpdateBooking);
    app.delete('/api/bookings/:id', authenticateToken, DeleteBooking);

    // Iniciar el servidor REST
    const restPort = 3001;
    app.listen(restPort, () => {
        console.log(`🚀 Servidor REST escuchando en http://localhost:${restPort}`);
    });

<<<<<<< HEAD
app.get('/api/bookings', authenticateToken, BookingGet);
app.post('/api/bookings', authenticateToken, BookingPost);
app.patch('/api/bookings/:id', authenticateToken, UpdateBooking);
app.delete('/api/bookings/:id', authenticateToken, DeleteBooking);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

// Iniciar el servidor
const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}!`));
app.listen(port, () => {
    console.log(`Servidor REST escuchando en http://localhost:${port}`);
    console.log(`Servidor GraphQL escuchando en http://localhost:${port}${server.graphqlPath}`);
});
=======
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
>>>>>>> 18edf0cdbc37884910c9921efa856746eb6ab676
