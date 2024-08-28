const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para iniciar la autenticación con Google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Ruta de callback de Google
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log('Autenticación exitosa');
        res.redirect('http://localhost:3001/ViewRideDriver.html'); // Redirigir después de la autenticación
    }
);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/'); // Redirigir a la página de inicio después del logout
    });
});

module.exports = router;
