const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json("Access denied");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json("Invalid token");
    }
};

module.exports = authenticateToken;
