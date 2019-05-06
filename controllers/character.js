const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

//obtiene todos los personajes
const getCharacters = (request, response) =>{
    let query = `SELECT * FROM personaje`;
    pool.query(query, (error, results)=>{
        if (error)
            throw error;
        else
            response.status(200).json(results);
    })
}

const getCharactersByname = (request, response)=>{
    let keywords = request.body.keywords.split(" ");
    let query = `SELECT * FROM personaje p WHERE `;
    for(let n = 0; n<keywords.length; n++){
        query += `LOWER(p.personaje) like '%${word.toLowerCase()}%' `;
        if(n != keywords.length -1)
            query += ` OR `;
    }
    pool.query(query, (error, results)=>{
        if (error)
            throw error;
        else
            response.status(200).json(results);
    })
}