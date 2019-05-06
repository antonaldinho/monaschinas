const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

const getCharacters = function(request, response) {
    pool.query("SELECT * FROM personaje ORDER BY nombre", (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

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

const getCharactersBySerie = function(request, response) {
    if(!request.query.serieId) {
        return response.send({
            success: 0,
            msg: "parameter serieId not found"
        });
    }
    const serie_id = request.query.serieId;
    return new Promise(function (resolve, reject) {
        console.log(serie_id);
        const query = "SELECT * FROM personaje WHERE serie_id = $1 ORDER BY nombre";
        const values = [serie_id];
        pool.query(query, values, (error, results) => {
            if(error) {
                reject(error);
            }
            else {
                resolve(results)
            }
        });
    }).then((results) => {
        response.status(200).json(results.rows);
    }).catch((error) => {
        response.status(400).json(error);
    });
};

const addCharacter = function(request, response) {
    if(!request.body.nombre || !request.body.serieId) {
        return response.send({
            success: 0,
            msg: "parameters nombre and/or serieId not found in body"
        });
    }
    const body = request.body;
    const query = "INSERT INTO personaje VALUES ($1, $2)";
    const values = [body.nombre, body.serieId];
    pool.query(query, values, (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

module.exports = {
    getCharacters: getCharacters,
    getCharactersBySerie: getCharactersBySerie,
    addCharacter: addCharacter,
    getCharactersByname:getCharactersByname
}