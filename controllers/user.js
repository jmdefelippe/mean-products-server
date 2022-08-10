const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(status.OK).json({errors: errors.array()});
    }
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if(user) {
        return res.status(status.OK).json({ msg: 'El usuario ya esta registrado' });
    }
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt );
    try {
        await user.save();
        res.json({msg : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
    }
}