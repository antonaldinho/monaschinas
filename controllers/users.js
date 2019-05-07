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

const deleteUser = (request, response)=>{
    let user_id = request.body.user_id; 

    let ticket_query = `SELECT ticket_id FROM ticket t WHERE t.usuario_id = '${user_id}'`;
    pool.query(ticket_query, (error, results)=>{
        if (error)
            throw error; 
        else { 
            for(let row of results.rows){//deslinda todos los tickets de los productos
                let productoticket_delete_query = `DELETE FROM productoticket a WHERE a.ticket_id = ${row.ticket_id}`;
                pool.query(productoticket_delete_query, (error, results)=>{
                    if (error)
                        throw error;
                    else{
                        //borra los tickets y al usuario 
                        let delete_tickets_query = `DELETE FROM ticket t WHERE t.usuario_id = '${user_id}';
                        DELETE FROM usuario u WHERE u.usuario_id = '${user_id}'`;
                        pool.query(delete_tickets_query, (error, results)=>{if(error)throw error;});
                    }
                });
            }
        }
    
    });

    response.status(200).send("OK!");
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

const login = function(request, response) {
    const body = request.body;
    const query1 = "SELECT contrasena FROM usuario WHERE usuario_id = $1";
    return new Promise((resolve, reject) => {
        pool.query(query1, [body.username], (error, results) => {
            if(error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    }).then((results) => {
        if(results.rowCount == 0) {
            response.status(200).json({
                success: 0,
                msg: "username does not exist"
            });
        }
        else {
            if(body.password == results.rows[0].contrasena) {
                pool.query("SELECT * FROM usuario WHERE usuario_id = $1", [body.username], (error, results) => {
                    if(error) {
                        throw error;
                    }
                    else {
                        response.status(200).json({
                            success: 1,
                            user: results.rows[0]
                        });
                    }
                });
            }
            else {
                response.status(200).json({
                    success: 0,
                    msg: "invalid password"
                });
            }
        }
    }).catch((error) => {
        response.status(400).json({
            success: 0,
            error: error
        });
    });
}
module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    getUser: getUser,
    login: login,
    deleteUser: deleteUser
}