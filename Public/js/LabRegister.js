var datau = {
    nombre: "",
    correo: "",
    pass: "",
    pass2: ""
};

document.getElementById('b1').addEventListener('click', function() {
    datau.nombre = document.getElementById("nombre").value;
    datau.correo = document.getElementById("correo").value;
    datau.pass = document.getElementById("pass").value;
    datau.pass2 = document.getElementById("pass2").value;
    if(datau.nombre && datau.correo && datau.pass && datau.pass2){
        if(datau.pass===datau.pass2){
            $.post({
                url: "/NewRegister",
                data: JSON.stringify(datau),
                contentType: "application/json",
                success: function(datosEntrada,status) {
                    if (datosEntrada === "OK") {
                        alert("Registro exitoso");
                        window.location.replace("/");
                    }
                    else{
                        alert("ERROR");
                    }                
                }
            });
        }
        else{
            document.getElementById("pass").value = "";
            document.getElementById("pass2").value = "";
            alert("Las contraseñas no coinciden");
        }
    }
    else{
        alert("Campos incompletos");
    }
    
});

document.getElementById('b2').addEventListener('click', function() {
    window.location.replace("/");
});