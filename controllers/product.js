const Product = require("../models/Product");
const status = require("../const/statusCode");
const { validationResult } = require('express-validator');

exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(status.OK).json({errors: errors.array() })
    }
    try {
        const product = new Product({...req.body, user: req.user.id});
        product.user = req.user.id;
        await product.save();
        res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send('Hubo un error');
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id });
        return res.json({ products });
    } catch (error) {
        console.log(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send('Hubo un error');
    }
}

exports.updateProduct = async (req, res) => {
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(status.OK).json({errores: errores.array() })
    }
    const { name, category, location, price } = req.body;
    const updatedProduct = {};
    updatedProduct.name = name ? name : product.name
    updatedProduct.category = category ? category : product.category
    updatedProduct.location = location ? location : product.location
    updatedProduct.price = price ? price : product.price
    
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrada '})
        }
        if (product.user.toString() !== req.user.id) {
            return res.status(status.UNAUTHORIZED).json({ msg: 'No autorizado '});
        }
        product = await Product.findByIdAndUpdate({ _id: req.params.id }, { $set:
        updatedProduct }, { new: true });

        res.json({product});
    } catch (error) {
        console.log(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send('Hubo un error');
    }
}

exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }
        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send('Hubo un error');
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'El producto no existe' })
        }
        if (product.user.toString() !== req.user.id) {
            return res.status(status.UNAUTHORIZED).json({ msg: 'No autorizado' });
        }
        await Product.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Producto eliminado' })
    } catch (error) {
        console.log(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send('Hubo un error');
    }
}