const express = require('express');
const router = express.Router();

const user = require('./controllers/users');
const products = require('./controllers/products');

router.get('/', (request, response) => {
    response.json({
        info: 'Welcome to the waifu API'
    });
});
router.get('/users', user.getUsers);

//----- product routes -----
router.get('/api/products', products.getProducts);
router.get('/api/products/getProductById', products.getProductById);
router.get('/api/products/getProductsByName', products.getProductsByName);
router.get('/api/products/getProductsbyBrand', products.getProductsByBrand);
router.get('/api/products/getProductsBySerie', products.getProductsBySerie);
router.get('/api/products/getProductsByExactPrice', products.getProductsByExactPrice);
router.get('/api/products/getProductsByLowerPrice', products.getProductsByLowerPrice);
router.get('/api/products/getProductsByHigherPrice', products.getProductsByHigherPrice);
router.get('/api/products/getProductsInStock', products.getProductsInStock);
router.get('/api/products/getProductsWithDiscount', products.getProductsWithDiscount);

module.exports = router;