const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");

const product = require('./routes/product');

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/api/products', product);

app.get('/', (req, res) => {
    res.send('Hola mundo');
})

app.listen(4000, () => {
    console.log("Servidor funciona correctamente");
})