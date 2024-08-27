const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    Lastname: { type: String },
    cardIdNumber: { type: String },
    BirthDate: { type: Date },
    email: { type: String, unique: true },
    password: { type: String },
    phoneNumber: { type: String }
});

// Método para comparar contraseñas
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

// Verificar si el modelo ya existe antes de crearlo
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);


