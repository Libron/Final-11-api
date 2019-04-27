const express = require('express');
const router = express.Router();

const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', (req, res) => {
    Category.find()
        .then(result => {
            const categories = result;
            Promise.all(categories.map((cat) => {
                return Product.countDocuments({category: cat._id}).then((count) => {
                    cat.count = count;
                })
            }))
                .then(() => {
                    res.send(categories);
                })
                .catch(() => res.sendStatus(500));
        });
});

module.exports = router;