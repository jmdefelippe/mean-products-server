const express = require('express');
const connectDB = require('./db');
const cors = require("cors");
const auth = require('../routes/auth');
const product = require('../routes/products');
const user = require('../routes/users');

function configureApp(app) {
    connectDB();

//    app.use(cors());

    const optionsCors = {
        origin: process.env.FRONTEND_URL
    }
    app.use(cors(optionsCors) );

    app.use(express.json());

    app.get('/', (req, res) => {
        res.json({
            "apiName": "mean-products-server",
            "description": "Products CRUD API REST",
            "version": "1.0.0"
        });
    })

    app.use('/api/auth', auth);
    app.use('/api/products', product);
    app.use('/api/users', user);

    return app;
}

module.exports = configureApp;