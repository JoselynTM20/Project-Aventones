const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar middleware de autenticación
const { authenticateToken } = require('./BackEend/middleware/authMiddleware');
const { login } = require('./BackEend/controllers/AuthControllers');

const { UserGet, UserPost } = require('./BackEend/controllers/UsersControllers');
const { DriverPost, DriverGet } = require('./BackEend/controllers/DriversControllers');
const { RidesDriverPost, RidesDriverGet, updateRide, deleteRide } = require('./BackEend/controllers/RidesControllers');

app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: '*'
}));

// Para la conexión a la base de datos
mongoose.connect("mongodb+srv://JoselynTijerino:JoselynTijerino@cluster0.6sdzi3m.mongodb.net")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Rutas
app.post('/api/login', login);

app.get('/api/user', authenticateToken, UserGet);
app.post('/api/user', authenticateToken, UserPost);

app.get('/api/driver', authenticateToken, DriverGet);
app.post('/api/driver', authenticateToken, DriverPost);

app.get('/api/rides', authenticateToken, RidesDriverGet);
app.post('/api/rides', authenticateToken, RidesDriverPost);
app.put('/api/rides/:id', authenticateToken, updateRide);
app.delete('/api/rides/:id', authenticateToken, deleteRide);

// Iniciar el servidor
const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
