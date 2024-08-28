const express = require('express');
const router = express.Router();
const passport = require('passport');

// Rutas de autenticación con Google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log('Autenticación exitosa');
        res.redirect('http://localhost:3001/ViewRideDriver.html');
    }
);

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;