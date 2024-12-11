const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, "webtoken");
        req.user = decoded; 
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token has expired' });
        }
        return res.status(403).send({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;