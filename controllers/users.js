const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM usuario ORDER BY usuario_id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUser = (request, response) => {
    if(!request.params.usuario) {
        return response.send({
            success: 0,
            msg: "parameter userId not found"
        });
    }
    return new Promise(function(resolve, reject) {
        const query = "SELECT * FROM usuario WHERE usuario_id = $1";
        const values = [request.params.usuario];
        pool.query(query, values, (error, results) => {
            if(error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    }).then((results) => {
        response.status(200).json(results.rows[0]);
    }).catch((error) => {
        response.status(400).json(error);
    });
};

const addUser = (request, response) => {
    if(!request.body.username) {
        return response.send({
            msg: 'username param not given',
            success: 0
        })
    }
    if(!request.body.email) {
        return response.send({
            msg: 'param email not given',
            success: 0
        })
    }
    if(!request.body.password) {
        return response.send({
            msg: 'contrasena param not given',
            success: 0
        })
    }

    if (checkUser(request.body.username)) {
        return response.send({
            msg: 'usuario',
            success: 0
        });
    }
    else {
        const body = request.body;
        //console.log(body);
        const query = "INSERT INTO usuario VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
        const values = [body.username, body.name, body.email, body.address, body.city, body.state, body.cp, body.password, body.userType];
        pool.query(query, values, (error, results) => {
            if (error) {
                throw error
            }
            else {
                //console.log(results);
                response.send({
                    msg: 'usuario agregado',
                    success: 1
                });
            }
        });
    }
}

function checkUser (user) {
    pool.query('SELECT COUNT(usuario_id) FROM usuario WHERE usuario_id = $1',[user], (error, results) => {
        if(error) {
            throw error;
        }
        else {
            if(parseInt(results.rows[0].count) == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    });
};
module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    getUser: getUser
}