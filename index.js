require('dotenv').config();
const express = require('express');
const configureApp = require('./config/app');
const app = configureApp(express());

app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT);
})