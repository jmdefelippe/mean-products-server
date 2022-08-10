const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
    auth,
    [
        check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('category', 'La categoría del producto es obligatoria').not().isEmpty(),
        check('location', 'La ubicación del producto es obligatoria').not().isEmpty(),
        check('price', 'El precio del producto es obligatorio').not().isEmpty()
    ],
    productController.createProduct
);

router.get('/', auth, productController.getProducts);
router.put('/:id', auth, productController.updateProduct);
router.get('/:id', auth, productController.getProduct);
router.delete('/:id', auth, productController.deleteProduct);


module.exports = router;