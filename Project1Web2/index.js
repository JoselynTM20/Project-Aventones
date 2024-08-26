const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Importar el módulo path
const app = express();

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
const { UserGet, UserPost } = require('./BackEend/controllers/usersControllers');
const { DriverPost, DriverGet } = require('./BackEend/controllers/driversControllers');
const { RidesDriverPost, RidesDriverGet, updateRideDriver, deleteRide, getRidesByDriver, RidesDriverGetById } = require('./BackEend/controllers/ridesControllers');
const { BookingPost, BookingGet, UpdateBooking, DeleteBooking } = require('./BackEend/controllers/BookingsControllers');

// Rutas de autenticación con Google
app.use('/api', authRoutes);

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
app.delete('/api/rides/:id', authenticateToken, getRidesByDriver);
app.get('/api/rides/:id', authenticateToken, RidesDriverGetById);

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
