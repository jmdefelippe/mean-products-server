const express = require('express');
const connectDB = require('./db');
const cors = require("cors");
const product = require('../routes/product');

function configureApp(app) {
    connectDB();

    app.use(cors());

    app.use(express.json());

    app.get('/', (req, res) => {
        res.json({
            "apiName": "mean-products-server",
            "description": "Products CRUD API REST",
            "version": "1.0.0"
        });
    })

    app.use('/api/products', product);

    return app;
}

module.exports = configureApp;