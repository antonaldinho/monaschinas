const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

const getSeries = function(request, response) {
    pool.query("SELECT * FROM serie ORDER BY nombre", (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const addSerie = function(request, response) {
    if(!request.body.nombre || !request.body.serieId) {
        return response.send({
            success: 0,
            msg: "parameters nombre and/or serieId not found"
        });
    }
    else {
        const body = request.body;
        const query = "INSERT INTO serie VALUES ($1, $2)";
        const values = [body.nombre, body.serieId];
        pool.query(query, values, (error, results) => {
            if(error) {
                throw error;
            }
            else {
                response.send({
                    success: 1,
                    msg: "serie agregada con exito"
                });
            }
        });
    }
}

module.exports = {
    getSeries: getSeries,
    addSerie: addSerie
}