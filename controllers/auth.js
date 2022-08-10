const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { validationResult } = require('express-validator');

exports.authenticateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(status.OK).json({errors: errors.array()});
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        res.status(status.UNAUTHORIZED).json({msg : 'El Usuario No Existe'});
        return next();
    } 
    if(bcrypt.compareSync(password, user.password )) {
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRET, {
            //expiresIn: '8h'
        }  );
        res.json({ token })
    } else {
        res.status(status.UNAUTHORIZED).json({msg: "Password Incorrecto"});
        return next();
    }
}

exports.authenticatedUser = (req, res, next) => {
    res.json({user: req.user } );
}