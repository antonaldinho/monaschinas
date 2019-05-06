const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

<<<<<<< HEAD
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
    const product_id = request.body.product_id;
    pool.query(`SELECT * FROM producto p 
    WHERE p.producto_id = ${product_id}`, 
    (error, results) => {
        if(error)
            throw error; 
        else
            response.status(200).json(results.rows); 
    });
};
=======
>>>>>>> 2f91363305696b99d61b61b1ddad7023a8a867bb

//obtiene los productos por nombre (Case Insensitive)
const getProductsByName = (request, response) => {
    const keywords = request.body.keywords.split(" ");
    let query = `SELECT * FROM producto p WHERE `;
    for(let n = 0; n<keywords.length; n++){
        query+= `LOWER(p.nombre_producto) like '%${keywords[n].toLowerCase()}%' `;
        if(n!=keywords.length-1)
            query += ` OR `;
    }
    pool.query(query, (error, results) => {
        if(error)
            throw error; 
        else 
            response.status(200).json(results.rows);
    });
}

//busca todos los productos cuya serie tengan cualquiera de las palabras introducidas
const getProductsBySerie = (request, response) => {
    const keywords = request.body.keywords.split(" ");
    let query = 'SELECT * FROM producto p WHERE ';
    for(let n = 0; n<keywords.length; n++){
        query+= `LOWER(p.serie_id) like '%${keywords[n].toLowerCase()}%' `;
        if(n!=keywords.length-1)
             query += ` OR `;
    }
    pool.query(query,
    (error, results) => {
        if(error)
            throw error;
        else
            response.status(200).json(results.rows);
    });
}

//obtiene los productos con el precio exacto
const getProductsByExactPrice = (request, response) => {
    const price = request.body.price;
    pool.query(`SELECT * FROM producto p
    WHERE p.precio = ${price}`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//regresa todos los productos con precio menor o igual que 
const getProductsByLowerPrice = (request, response) => {
    const price = request.body.price;
    pool.query(`SELECT * FROM producto p
    WHERE p.precio <= ${price}`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//regresa todos los productos mayor o igual que 
const getProductsByHigherPrice = (request, response) => {
    const price = request.body.price;
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
    const brand = request.body.brand;
    pool.query(`SELECT * FROM producto p
    WHERE LOWER(p.marca) like '%${brand.toLowerCase()}%'`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//obtiene todos los productos con descuento
const getProductsWithDiscount = (request, response) => {
    pool.query(`SELECT * FROM producto p
    WHERE p.descuento != 0`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//obtiene todos los productos en stock
const getProductsInStock = (request, response) => {
    pool.query(`SELECT * FROM producto p
    WHERE p.stock > 0`,
    (error, results) => {
        if(error)
            throw error;
        else 
            response.status(200).json(results.rows);
    });
}

//agrega un producto nuevo
const addProduct = (request, response) => {
    let producto_id = request.body.producto_id; 
    let nombre_producto = request.body.nombre_producto;
    let nombre_personaje = request.body.nombre_personaje; 
    let serie_id = request.body.serie_id; 
    let stock = request.body.stock; 
    let precio = request.body.precio; 
    let imagen_id = request.body.imagen_id == "null" ? null : request.body.imagen_id;
    let descuento = request.body.descuento; 
    let altura = request.body.altura; 
    let marca = request.body.marca;
    let query = `INSERT INTO producto VALUES(
        ${producto_id},
        '${nombre_producto}',
        '${nombre_personaje}',
        '${serie_id}', 
        ${stock},
        ${precio},
        ${imagen_id},
        ${descuento},
        ${altura},
        '${marca}'
    );`;
        pool.query(query, (error, results)=>{
            if (error)
                if(error.detail.includes('is not present in table') && 
                error.constraint.includes('nombre_personaje')){
                    response.status(406).send("Ese personaje no esta registrado en la base de datos.");
                }else if (error.detail.includes('is no present in table') && 
                error.constraint.includes('serie_id')){
                    response.status(406).send("Esa serie no esta registrada en la base de datos.");
                }else{
                    throw error; 
                }
            else{
                response.status(200).send("OK!");
            }
        });
}

//borra un producto
const deleteProduct = (request, response)=>{
    let product_id = request.body.product_id; 
    let query = `DELETE FROM producto WHERE producto_id = ${product_id}`;
    pool.query(query, (error, results)=>{
        if (error)
            throw error; 
        else
            response.status(200).send("OK!");
    });
}

module.exports = {
    //gets
    getProducts: getProducts,
    getProductById: getProductById, 
    getProductsByName: getProductsByName,
    getProductsByBrand: getProductsByBrand,
    getProductsByExactPrice: getProductsByExactPrice,
    getProductsByLowerPrice: getProductsByLowerPrice,
    getProductsByHigherPrice: getProductsByHigherPrice,
    getProductsBySerie: getProductsBySerie,
    getProductsInStock: getProductsInStock, 
    getProductsWithDiscount: getProductsWithDiscount,
    //posts
    addProduct:addProduct,
    //deletes
    deleteProduct: deleteProduct
}