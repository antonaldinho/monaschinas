const user = JSON.parse($.session.get("userData"));

$(document).ready(function() {
    // all custom jQuery will go here
    $('#name-perfil').text(user.usuario_id);
    $('#address-perfil').text(user.direccion);
});