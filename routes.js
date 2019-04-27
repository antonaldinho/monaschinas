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
router.get('/characters', products.getCharacters);

module.exports = router;