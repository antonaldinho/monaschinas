const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

const getImages = (request, response) =>{
    let query = `SELECT * FROM imagen`;
    pool.query(query, (error, results)=>{
        if (error)
            throw error; 
        else
            response.status(200).json(results.rows); 
    })
}

const getImage = (request, response) =>{
    let image_id = request.query.image_id; 
    let query = `SELECT nombre, nombre_imagen FROM imagen i WHERE i.imagen_id = ${image_id};`;
    pool.query(query, (error, results)=>{
        if (error)
            throw error;
        else
            response.status(200).json(results.rows);
    })
}

module.exports = {
    getImage: getImage, 
    getImages: getImages
}