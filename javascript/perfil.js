const user = JSON.parse($.session.get("userData"));

function loadPurchaseTable (username) {
    var table = $('#tabla-ordenes');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/api/ticket/getUserPurchaseHistory?user_id=antonaldinho",
        "method": "GET",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
        "data": ""
    }  
    $.ajax(settings).done(function (response) {
        response.products.forEach(function(product) {
            table.append("<tr><td>" + product.nombre_producto + "</td><td>" + product.cantidad + "</td><td>" + product.precio + "</td></tr>");
        })
    });
}
$(document).ready(function() {
    // all custom jQuery will go here
    $('#name-perfil').text(user.usuario_id);
    $('#address-perfil').text(user.direccion);
    loadPurchaseTable(user.usuario_id);
});