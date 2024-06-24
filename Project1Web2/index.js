const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');


const { login } = require('../Project1Web2/BackEend/controllers/authControllers');

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


const { RidesDriverPost } = require('../Project1Web2/BackEend/controllers/ridesControllers');
app.post("/api/rides", RidesDriverPost);

// Iniciar el servidor
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));