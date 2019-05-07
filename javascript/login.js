$(document).ready(function() {
    // all custom jQuery will go here
    $("#btn_login").click(function(){
        const username = $('#login_email').val();
        const password = $('#login_pword').val();
        const credentials = {
            username: username,
            password: password
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/login",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json"
            },
            "processData": false,
            "data": JSON.stringify(credentials)
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.success === 1) {
                const userData = response.user;
                $.session.set("userData", JSON.stringify(userData));
                location.href = 'file:///D:/Projects/APIS/monaschinas/api/views/home.html';
            }
            else {
                alert("Usuario y/o contraseña no válidos");
            }
        });
    })
});