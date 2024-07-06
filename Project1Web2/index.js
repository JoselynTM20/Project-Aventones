const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar middleware de autenticación
const { authenticateToken } = require('./BackEend/middleware/authMiddleware');
const { login } = require('./BackEend/controllers/authControllers');

const { UserGet, UserPost } = require('./BackEend/controllers/usersControllers');
const { DriverPost, DriverGet } = require('./BackEend/controllers/driversControllers');
const { RidesDriverPost, RidesDriverGet, updateRide, deleteRide } = require('./BackEend/controllers/ridesControllers');
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

/*mongoose.connect("mongodb+srv://JoselynTijerino:JoselynTijerino@cluster0.6sdzi3m.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})*/
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Rutas Públicas (no requieren autenticación)
app.post('/api/login', login);
app.post('/api/register', UserPost); // Ruta para registrar nuevos usuarios

// Rutas Privadas (requieren autenticación)
app.get('/api/user', UserGet);
app.post('/api/user' , UserPost);

app.get('/api/driver', authenticateToken, DriverGet);
app.post('/api/driver', authenticateToken, DriverPost);

app.get('/api/rides', authenticateToken, RidesDriverGet);
app.post('/api/rides', authenticateToken, RidesDriverPost);
app.put('/api/rides/:id', authenticateToken, updateRide);
app.delete('/api/rides/:id', authenticateToken, deleteRide);

app.get('/api/bookings', authenticateToken, BookingGet);
app.post('/api/bookings', authenticateToken, BookingPost);
app.put('/api/bookings/:id', authenticateToken, UpdateBooking);
app.delete('/api/bookings/:id', authenticateToken, DeleteBooking);

// Iniciar el servidor
const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
