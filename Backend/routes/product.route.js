const express = require('express');
const Product = require('../models/product.model.js');
const {getProducts, deleteProduct,createProduct, changeProduct}= require('../controllers/product.controller.js');
const router = express.Router();

router.get('/', getProducts);

router.post('/', createProduct);

router.put('/:id', changeProduct);

router.delete('/delete-by-name', deleteProduct);

module.exports = router;