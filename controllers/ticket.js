const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'monitaschinas2',
    password: 'password',
    port: 5432
});

//obtiene todos los tickets de compra de un usuario (GET)
const getUserTickets = (request, response) => {
    const user_id = request.body.user_id;
    pool.query(`SELECT * FROM ticket t
    WHERE t.usuario_id = '${user_id}'`, 
    (error, results)=>{
        if(error){
            throw error; 
        } response.status(200).json(results.rows);

    });
}

//obtiene todos los productos relacionados a un ticket (GET)
const getTicketProducts = (request, response) => {
    const ticket_id =  request.body.ticket_id;
    pool.query(`SELECT t.fecha,
                       a.cantidad, 
                       p.nombre_producto, 
                       p.nombre_personaje,
                       p.serie_id,
                       p.precio,
                       p.descuento,
                       p.marca,
                       p.altura,
                       p.imagen_id 
    FROM ticket t, productoticket a, producto p
    WHERE a.ticket_id = t.ticket_id AND 
          a.producto_id = p.producto_id AND
          t.ticket_id = ${ticket_id}`,
    (error, results) => {
        if(error){
            throw error; 
        } response.status(200).json(results.rows);
    });
 }
//obtiene todos los productos relacionados al ticket de compra de un usuario en particular (GET)
const getUserTicketProducts = (request, response) => {
    const user_id = request.body.user_id; 
    const ticket_id = request.body.ticket_id; 
    pool.query(`SELECT t.fecha,
                       a.cantidad, 
                       p.nombre_producto, 
                       p.nombre_personaje,
                       p.serie_id,
                       p.precio,
                       p.descuento,
                       p.marca,
                       p.altura,
                       p.imagen_id 
    FROM ticket t, productoticket a, producto p
    WHERE a.ticket_id = t.ticket_id AND 
          a.producto_id = p.producto_id AND 
          t.ticket_id = ${ticket_id} AND 
          t.usuario_id = '${user_id}'`,
    (error, results) =>{
        if(error){
            throw error; 
        } response.status(200).json(results.rows);
    });
}

//obtiene todos los productos que ha comprado un usuario desde que se registro(GET)
const getUserPurchaseHistory = (request, response) =>{
    const user_id = request.body.user_id; 
    pool.query(`SELECT t.fecha, 
                       t.ticket_id,
                       a.cantidad, 
                       p.nombre_producto, 
                       p.nombre_personaje,
                       p.serie_id,
                       p.precio,
                       p.descuento,
                       p.marca,
                       p.altura,
                       p.imagen_id
    FROM ticket t, productoticket a, producto p
    WHERE a.ticket_id = t.ticket_id AND
          a.producto_id = p.producto_id AND
          t.usuario_id = '${user_id}'`,
    (error, results) => {
        if(error){
            throw error;
        } response.status(200).json(results.rows);
    });
}

//regresa todos los tickets del usuario donde cualquiera de los nombres de los productos contenga cualqueira de las palabras introducidas,
// es practicamente como un control f sobre los tickets del usuario (GET)
const findProductInUserTickets = (request, response)=>{
    const user_id = request.body.user_id; 
    const keywords = request.query.product_name.split(" ");
    let query = `
    SELECT t.ticket_id, t.usuario_id, t.total, t.fecha, t.comentarios 
    FROM ticket t, productoticket a, producto p 
    WHERE a.ticket_id = t.ticket_id AND 
          a.producto_id = p.producto_id AND
          t.usuario_id = '${user_id}' AND 
          (`
    for(let n = 0; n<keywords.length; n++){
        query += `LOWER(p.nombre_producto) like '%${keywords[n].toLowerCase()}%'`;
        if(n != keywords.length-1){
            query+= ` OR
             `;
        }else{
            query+= `) `;
        }

    }
    pool.query(query, 
        (error, results)=>{
            if(error){
                throw error;
            } response.status(200).json(results.rows);
        })
    }

//crea un nuevo ticket y lo relaciona con los productos en la tabal productoticket (POST)
const createUserTicket = (request, response)=> {
    let user_id = request.body.user_id;
    let ticket_id = request.body.ticket_id; 
    let total = request.body.total; 
    let date = request.body.date; 
    let comment = request.body.comment; 
    let purchase_info = request.body.purchase_info;//json con producto_id y cuantos compro de ese producto
    let query = `INSERT INTO ticket VALUES(${ticket_id}, '${user_id}', ${total}, '${date}', '${comment}');`;
    let query2 = '';  
    for(let purchase of purchase_info) {
        query2 += `INSERT INTO productoticket (ticket_id, producto_id, cantidad) VALUES (${ticket_id}, ${purchase.producto_id}, ${purchase.cantidad} ); `;
    }
    pool.query(query, (error, results) => {
        if(error)
            throw error;
    });
    pool.query(query2, (error, results) => {
        if (error)
            throw error; 
    })
    response.status(200).send("OK!");
}


//borra un ticket y deshace la relacion existente en la tabla productoticket (DELETE)
const deleteTicket = (request, response)=>{
    let ticket_id = request.body.ticket_id;
    let query = `DELETE FROM productoticket WHERE ticket_id = ${ticket_id};
    DELETE FROM ticket WHERE ticket_id = ${ticket_id};`;
    pool.query(query, (error, results) => {
        if (error)
            throw error;
    })
    response.status(200).send("OK!");
}

module.exports = {
    //gets
    getUserTickets: getUserTickets,
    getUserTicketProducts: getUserTicketProducts,
    getTicketProducts: getTicketProducts,
    getUserPurchaseHistory: getUserPurchaseHistory,
    findProductInUserTickets: findProductInUserTickets,
    //posts
    creatUserTicket: createUserTicket,
    //deletes
    deleteTicket: deleteTicket
}