var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
function populateProductTables() {
    var tables = $('.products_body');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urls.getProducts,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Postman-Token": "b7e6562b-61ab-40dd-bdf3-8c0347e07229"
        },
        "processData": false,
        "data": ""
    }
      
    $.ajax(settings).done(function (response) {
        //console.log(response);
        response.forEach(function(product) {
            const newAppend = '<div id="' + product.producto_id + '" class="who_Quienes"> <br> <div class="login_titulo_producto"> <div class="login_titulo_text">Producto Nombre</div> </div> <form class="login_forma_producto"> <div class="login_forma_producto_part1"> <div class="login-forma-first"> <img class="login-forma-first-picture" src="https://via.placeholder.com/200"> </div> </div> <div class="login_forma_producto_part2"> <div class="login-forma-first"> <div class="login-title"> <label class="login-title_text" for="fname">Nombre del Producto</label> </div> <div class="login-input">' + product.nombre_producto + '<br><br> </div> </div> <div class="login-forma-first"> <div class="login-title"> <label class="login-title_text" for="fname">Precio</label> </div> <div class="login-input"> $' + product.precio + '<br><br> </div> </div> <div class="login-forma-first"> <div class="login-title"> <label class="login-title_text" for="lname">Descripción</label><br> </div> <div class="login-input">' + product.descripcion + '<br><br> </div> </div> </div> <div class="btn_producto_container"> <input class="btn_producto" onclick="loginBtn()" type="button" value="Comprar"> </div> </form> </div>';
            tables.append(newAppend);
        })
    });
}
$(document).ready(function() {
    // all custom jQuery will go here
    populateProductTables();
});