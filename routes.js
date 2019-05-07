const express = require('express');
const router = express.Router();

const user = require('./controllers/users');
const products = require('./controllers/products');
const ticket = require('./controllers/ticket');
const series = require('./controllers/series');
const characters = require('./controllers/characters');
const images = require('./controllers/image');

router.get('/', (request, response) => {
    response.json({
        info: 'Welcome to the waifu API'
    });
});

router.post('/login', user.login);

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
router.get('/api/users', user.getUsers);
router.get('/api/users/getUser/:usuario', user.getUser);
router.post('/api/users/addUser', user.addUser);
router.delete('/api/users/deleteUser', user.deleteUser);
//-------series routes -----------
router.get('/api/series/getSeries', series.getSeries);
router.post('/api/series/addSerie', series.addSerie);
//------- character routes ----------
router.get('/api/characters', characters.getCharacters);
router.get('/api/characters/getCharactersBySerie', characters.getCharactersBySerie);
router.post('/api/characters/addCharacter', characters.addCharacter);
//------- images routes ------------------
router.get('/api/images/', images.getImages);
router.get('/api/images/getImage', images.getImage);

module.exports = router;