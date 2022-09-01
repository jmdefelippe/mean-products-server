const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/', 
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('name', 'El Nombre es Obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6}),
    ],
    userController.newUser
);
router.get('/:id', auth, userController.getUser);

module.exports = router;