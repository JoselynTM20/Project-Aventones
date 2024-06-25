const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');


const { login } = require('../Project1Web2/BackEend/controllers/authControllers');
// Importar el modelo de Ride
const Ride = require('../Project1Web2/BackEend/models/RidesDriversModel');

app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: "*"
}));

//para la conexion a bd
//const db = mongoose.connect("mongodb+srv://lingama04:1234@cluster0.qlrltgq.mongodb.net/users");
const db = mongoose.connect("mongodb+srv://JoselynTijerino:JoselynTijerino15@cluster0.bzbj5gg.mongodb.net/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post("/api/login", login);

const { UserPost, UserGet, UserPut, UserDelete } = require('../Project1Web2/BackEend/controllers/usersControllers');
app.get("/api/user/", UserGet);
app.post("/api/user/",  UserPost);
////app.put("/api/user", UserPut);
//app.delete("/api/user", UserDelete);


const { DriverPost, DriverGet } = require('../Project1Web2/BackEend/controllers/driversControllers');
// Rutas para conductores
app.get("/api/driver/", DriverGet);
app.post("/api/driver/", DriverPost);


const { RidesDriverPost,  RidesDriverGet, updateRideDriver} = require('../Project1Web2/BackEend/controllers/ridesControllers');
app.post("/api/rides", RidesDriverPost);
app.get("/api/rides", RidesDriverGet);
app.put("/api/rides", updateRideDriver);
// Ruta para eliminar un ride por su ID
/*app.delete('/api/rides/:rideid', async (req, res) => {
    const rideId = req.params.rideid;

    try {
        const deletedRide = await Ride.findByIdAndDelete(rideId);
        if (!deletedRide) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        res.json({ message: 'Ride deleted successfully' });
    } catch (error) {
        console.error('Error deleting ride:', error);
        res.status(500).json({ error: 'Failed to delete ride' });
    }
});*/



// Iniciar el servidor
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));