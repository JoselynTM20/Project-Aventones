const jwt = require('jsonwebtoken');

const authenticateToken = (authHeader) => {
    if (!authHeader) {
        throw new Error('Authorization header is missing');
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





/*const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'sientre', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    })
};*/

module.exports = { authenticateToken };