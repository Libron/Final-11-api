const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');

const auth = require('../middleware/auth');
const config = require('../config');

const Product = require('../models/Product');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', (req, res) => {
    let searchParam = null;
    if (req.query.catId) {
        searchParam = {category: req.query.catId};
    }

    Product.find(searchParam).populate('seller category')
        .then(products => res.send(products))
        .catch(() => res.sendStatus(500));
});

router.get('/:id', (req, res) => {
    Product.findById(req.params.id).populate('category seller')
        .then(product => {
            if (product) res.send(product);
            else res.sendStatus(404);
        })
        .catch(() => res.sendStatus(500));
});

router.post('/', auth, upload.single('image'), (req, res) => {
    const productData = req.body;
    productData.seller = req.user._id;

    if (req.file) {
        productData.image = req.file.filename;
    }
    const product = new Product(productData);
    product.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

router.delete('/:id', auth, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller');
    if (!product) {
        res.sendStatus(404);
    }

    if (!req.user._id.equals(product.seller._id)) {
        res.sendStatus(403);
    }

    try {
        await product.remove();
        res.send(product);
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;