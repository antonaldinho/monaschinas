const express = require('express');
const router = express.Router();

const user = require('./controllers/users');
const products = require('./controllers/products');
const series = require('./controllers/series');
const characters = require('./controllers/characters');

router.get('/', (request, response) => {
    response.json({
        info: 'Welcome to the waifu API'
    });
});
router.get('/users', user.getUsers);
router.get('/users/:usuario', user.getUser);
router.post('/users', user.addUser);
router.post('/login', user.login);
router.get('/series', series.getSeries);
router.post('/series', series.addSerie);
router.get('/characters', characters.getCharacters);
router.get('/characters/byserie', characters.getCharactersBySerie);
router.post('/characters', characters.addCharacter);

module.exports = router;