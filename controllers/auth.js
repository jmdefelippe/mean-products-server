const User = require('../models/User');
const status = require("../const/statusCode");
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
        return res.status(status.UNAUTHORIZED).json({msg : 'Credenciales inválidas'});
    } 
    if(bcrypt.compareSync(password, user.password )) {
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRET, {
            // expiresIn: '8h'
        });
        return res.json({ token, expiresIn: '8h' })
    } else {
        return res.status(status.UNAUTHORIZED).json({msg: "Credenciales inválidas"});
    }
}

exports.authenticatedUser = (req, res, next) => {
    res.json({ user: req.user } );
}