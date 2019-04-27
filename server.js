const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const users = require('./app/users');
const categories = require('./app/categories');
const products = require('./app/products');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8000;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/categories', categories);
    app.use('/users', users);
    app.use('/products', products);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});