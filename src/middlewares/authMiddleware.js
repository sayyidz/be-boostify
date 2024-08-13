const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const accessValidation = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({
            message: "No token provided"
        })
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
      });
}

module.exports = accessValidation;