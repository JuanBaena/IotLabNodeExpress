var datau = {
    correo: "",
    pass: ""
};

document.getElementById('b1').addEventListener('click', function() {
    datau.correo = document.getElementById("correo").value;
    datau.pass = document.getElementById("pass").value;
    
    if (datau.correo && datau.pass){
        $.post({
            url: "/Login",
            data: JSON.stringify(datau),
            contentType: "application/json",
            success: function(datosEntrada,status) {
                if (datosEntrada === "OK") {
                    window.location.replace("/Sensor");
                }
                else if (datosEntrada === "NO USER"){
                    alert("Nombre de usuario y/o contraseña incorrectos");
                }
                else {
                    alert("ERROR");
                }                    
            }
        });
    }
    else{
        alert("Completar Campos");
    }    
});

document.getElementById('b2').addEventListener('click', function() {
    window.location.replace("/Register");
});

