const { User } = require('./models/User'); // Asegúrate de ajustar la ruta según tu estructura

exports.verifyEmail = async (req, res) => {
    try {
        const token = req.query.token;

        // Aquí deberías implementar la lógica para validar el token y extraer el email.
        // Por simplicidad, asumimos que el token es el email.
        const email = token; // Asegúrate de adaptar esta lógica a tus necesidades

        // Encuentra el usuario y actualiza su estado
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.status = 'active';
        await user.save();

        res.redirect('/login.html'); // Redirige al usuario a la pantalla de inicio de sesión
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};