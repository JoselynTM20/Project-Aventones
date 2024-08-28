const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error('Token is missing');
    }

    try {
        const user = jwt.verify(token, 'sientre'); // 'sientre' debería ser tu clave secreta
        return user;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = { authenticateToken };



