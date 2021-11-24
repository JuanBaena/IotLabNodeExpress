var datau = {
    actuador: "",
    estado: ""
};

var SensorDataBase;

function SetCurrentUser(){
    SetSensorValues();
    $.get({
        url: "/GetUser",
        success: function(datosEntrada) {
            document.getElementById("ShowUser").innerHTML = datosEntrada;  
        }
    });
}

function SetSensorValues(){
    $.get({
        url: "/GetSensor",
        success: function(datosEntrada) {
            SensorDataBase = datosEntrada;
            var data1= JSON.parse(JSON.stringify(SensorDataBase)) ;
            document.getElementById("T11").innerHTML = data1[0].sensor;
            document.getElementById("T12").innerHTML = data1[0].temp;
            document.getElementById("T13").innerHTML = data1[0].hum;
            document.getElementById("T21").innerHTML = data1[1].sensor;
            document.getElementById("T22").innerHTML = data1[1].temp;
            document.getElementById("T23").innerHTML = data1[1].hum;
            document.getElementById("T31").innerHTML = data1[2].sensor;
            document.getElementById("T32").innerHTML = data1[2].temp;
            document.getElementById("T33").innerHTML = data1[2].hum;
        }
    });
}

function ModifyActuator(act,sta){
    datau.actuador = act;
    datau.estado = sta;
    $.post({
        url: "/NewDataActuator",
        data: JSON.stringify(datau),
        contentType: "application/json",
        success: function(datosEntrada,status) {
            if (datosEntrada === "OK") {
                alert("Actuador Modificado");
            }
            else{
                alert("ERROR");
            }                
        }
    });
}
