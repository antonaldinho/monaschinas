const express = require('express');
const router = express.Router();

const user = require('./controllers/users');
const products = require('./controllers/products');
const ticket = require('./controllers/ticket');
const series = require('./controllers/series');
const characters = require('./controllers/characters');

router.get('/', (request, response) => {
    response.json({
        info: 'Welcome to the waifu API'
    });
});

//--- rutas de user ----
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
router.post('/api/products/addProduct', products.addProduct);
router.delete('/api/products/deleteProduct', products.deleteProduct);
//----- ticket routes ------ 
router.get('/api/ticket/getUserTickets/', ticket.getUserTickets);
router.get('/api/ticket/getTicketProducts', ticket.getTicketProducts);
router.get('/api/ticket/getUserTicketProducts', ticket.getUserTicketProducts);
router.get('/api/ticket/getUserPurchaseHistory', ticket.getUserPurchaseHistory);
router.get('/api/ticket/findProductInUserTickets', ticket.findProductInUserTickets);
router.post('/api/ticket/createUserTicket', ticket.creatUserTicket);
router.delete('/api/ticket/deleteTicket', ticket.deleteTicket);
//-------user routes ----------
router.get('/users/:usuario', user.getUser);
router.post('/users', user.addUser);
//-------series routes -----------
router.get('/series', series.getSeries);
router.post('/series', series.addSerie);
//------- character routes ----------
router.get('/characters', characters.getCharacters);
router.get('/characters/byserie', characters.getCharactersBySerie);
router.post('/characters', characters.addCharacter);

module.exports = router;