const jwt = require('jsonwebtoken');
const status = require("../const/statusCode");
require('dotenv').config();
//require('dotenv').config({ path: 'variables.env'});

module.exports = (req, res, next ) => {
    const authHeader = req.get('Authorization');
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, process.env.SECRET );
                req.user = user;
                return next();
            } catch (error) {
                return res.status(status.UNAUTHORIZED).json({msg : 'JWT no valido'});
            }
        }
    } else {
        return res.status(status.UNAUTHORIZED).json({msg : 'No se encontró el Token'});
    }
}