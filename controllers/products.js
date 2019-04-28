const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

//obtiene todos los productos
const getProducts = (request, response) =>{
    pool.query(`SELECT * FROM producto p ORDER BY p.nombre_producto ASC`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//obtiene un producto por su ID
const getProductById = (request, response) => {
    const id = request.query.id;
    pool.query(`SELECT * FROM producto p 
    WHERE p.producto_id = ${id}`, 
    (error, results) => {
        if(error){
            throw error; 
        } response.status(200).json(results.rows); 
    });
};

//obtiene los productos por nombre (Case Insensitive)
const getProductsByName = (request, response) => {
    const name = request.query.name; 
    pool.query(`SELECT * FROM producto p
    WHERE LOWER(p.nombre_producto) like '%${name.toLowerCase()}%'`,
    (error, results) => {
        if(error){
            throw error; 
        } response.status(200).json(results.rows);
    });
}

//busca todas las series que tengan cualquiera de las palabras introducidas
const getProductsBySerie = (request, response) => {
    const keywords = request.query.serie.split(" ");
    let query = 'SELECT * FROM producto p WHERE ';
    for(let n = 0; n<keywords.length; n++){
        if(n!=keywords.length-1){
            query+= `LOWER(p.serie_id) like '%${keywords[n].toLowerCase()}%' OR `;
        }else{
            query+= `LOWER(p.serie_id) like '%${keywords[n].toLowerCase()}%'`;
        }
    }
    pool.query(query,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//obtiene los productos con el precio exacto
const getProductsByExactPrice = (request, response) => {
    const price = request.query.price;
    pool.query(`SELECT * FROM producto p
    WHERE p.precio = ${price}`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

const getProductsByLowerPrice = (request, response) => {
    const price = request.query.price;
    pool.query(`SELECT * FROM producto p
    WHERE p.precio <= ${price}`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

const getProductsByHigherPrice = (request, response) => {
    const price = request.query.price;
    pool.query(`SELECT * FROM producto p
    WHERE p.precio >= ${price}`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//obtiene los productos por marca (Case Insensitive)
const getProductsByBrand = (request, response) => {
    const brand = request.query.brand;
    pool.query(`SELECT * FROM producto p
    WHERE LOWER(p.marca) like '%${brand.toLowerCase()}%'`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

const getProductsWithDiscount = (request, response) => {
    pool.query(`SELECT * FROM producto p
    WHERE p.descuento != 0`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

const getProductsInStock = (request, response) => {
    pool.query(`SELECT * FROM producto p
    WHERE p.stock > 0`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

module.exports = {
    getProducts: getProducts,
    getProductById: getProductById, 
    getProductsByName: getProductsByName,
    getProductsByBrand: getProductsByBrand,
    getProductsByExactPrice: getProductsByExactPrice,
    getProductsByLowerPrice: getProductsByLowerPrice,
    getProductsByHigherPrice: getProductsByHigherPrice,
    getProductsBySerie: getProductsBySerie,
    getProductsInStock: getProductsInStock, 
    getProductsWithDiscount: getProductsWithDiscount
}