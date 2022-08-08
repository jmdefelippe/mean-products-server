const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        let product;
        product = new Product(req.body);
        await product.save();
        return res.send(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, category, location, price } = req.body;
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        product.name = name;
        product.category = category;
        product.location = location;
        product.price = price;

        product = await Product.findOneAndUpdate({ _id: req.params.id }, product, { new: true });
        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
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
        return res.status(500).send('Hubo un error');
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto' });
        }

        await Product.findOneAndRemove({ _id: req.params.id });
        return res.json({ msg: 'Producto eliminado con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}