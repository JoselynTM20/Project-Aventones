const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
import { ApolloProvider } from '@apollo/client';
import client from './GraphQL/Config/ApolloClient';  // Importa el archivo de configuración

// Importar middleware de autenticación
const { authenticateToken } = require('./BackEend/middleware/authMiddleware');
const { login } = require('./BackEend/controllers/authControllers');

// Importa los typeDefs y resolvers de GraphQL
const typeDefs = require('./GraphQL/Schemas/index');
const resolvers = require('./GraphQL/Resolvers/index');


const { UserGet, UserPost } = require('./BackEend/controllers/usersControllers');
const { DriverPost, DriverGet } = require('./BackEend/controllers/driversControllers');
const { RidesDriverPost, RidesDriverGet, updateRideDriver, deleteRide, getRidesByDriver, RidesDriverGetById } = require('./BackEend/controllers/ridesControllers');
const { BookingPost, BookingGet, UpdateBooking, DeleteBooking } = require('./BackEend/controllers/BookingsControllers');

app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: '*'
}));

// Para la conexión a la base de datos

mongoose.connect("mongodb+srv://lingama04:1234@cluster0.qlrltgq.mongodb.net/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

/*mongoose.connect("mongodb+srv://JoselynTijerino:JoselynTijerino@cluster0.6sdzi3m.mongodb.net/users", {
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));*/



// Configurar Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Aquí puedes agregar lógica para pasar información de autenticación o contexto a los resolvers
        const token = req.headers.authorization || '';
        // Validar el token si es necesario y pasar datos del usuario al contexto
        return { token };
    }
});

// Aplicar middleware de Apollo Server con Express
await server.start();
server.applyMiddleware({ app });    
// Rutas Públicas (no requieren autenticación)
app.post('/api/login', login);
app.post('/api/register', UserPost); // Ruta para registrar nuevos usuarios

// Rutas Privadas (requieren autenticación)
app.get('/api/user', UserGet);
app.post('/api/user' , UserPost);

app.get('/api/driver', authenticateToken, DriverGet);
app.post('/api/driver', DriverPost);

app.get('/api/rides', authenticateToken, RidesDriverGet);
app.post('/api/rides', authenticateToken, RidesDriverPost);
app.put('/api/rides/:id', authenticateToken, updateRideDriver);
app.delete('/api/rides/:id', authenticateToken, deleteRide);
app.delete('/api/rides/:id', authenticateToken, getRidesByDriver);
app.get('/api/rides/:id', authenticateToken, RidesDriverGetById);


app.get('/api/bookings', authenticateToken, BookingGet);
app.post('/api/bookings', authenticateToken, BookingPost);
app.patch('/api/bookings/:id', authenticateToken, UpdateBooking);
app.delete('/api/bookings/:id', authenticateToken, DeleteBooking);

// Iniciar el servidor
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor REST escuchando en http://localhost:${port}`);
    console.log(`Servidor GraphQL escuchando en http://localhost:${port}${server.graphqlPath}`);
});