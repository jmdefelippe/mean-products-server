const jwt = require('jsonwebtoken');
require('dotenv').config();
//require('dotenv').config({ path: 'variables.env'});

module.exports = (req, res, next ) => {
    const authHeader = req.get('Authorization');

    console.log({authHeader})

    if(authHeader) {
        // Obtener el Token 
        const token = authHeader.split(' ')[1];
        console.log({token})
        if(token) {
            // comprobar el JWT
            try {
                const user = jwt.verify(token, process.env.SECRET );
                console.log({user})
                req.user = user;
            } catch (error) {
                console.log(error);
                console.log('JWT no valido');
            }
        }
    } 

    return next();
}