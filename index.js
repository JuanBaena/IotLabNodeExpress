console.log("Servidor Laboratorio Web");
const { response } = require("express");
const express = require("express"); 
const app = express();



var permiso = 0;
var usuario;
var SensorDataBase;

app.use(express.json());
app.use(express.static("Public"));

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "Baena1",
    password: "3152",
    database: "labwebdata"
});

app.get("/",function(request,response){
    response.status(200);
    response.sendFile(__dirname + "/Public/LabLogin.html");
    permiso = 0;
});

app.get("/GetUser",function(request,response){
    response.status(200);
    response.send(usuario);
});

app.get("/Register",function(request,response){
    response.status(200);//Enviar código de status
    response.sendFile(__dirname + "/public/LabRegister.html");
});

app.get("/Sensor",function(request,response){
    if(permiso===1){
        response.sendFile(__dirname + "/public/LabSensor.html");
        response.status(200);//Enviar código de status
    }
    else{
        response.send("ERROR");
        response.status(404);//Enviar código de status
    }
});

app.get("/GetSensor",function(request,response){
    response.status(200);//Enviar código de status
    con.query('SELECT sensor, temp, hum FROM sensores', function(error,result,fields){
        response.status(200);//Enviar código de status
        console.log(result);
        response.send(result);
    });
});

app.post("/Login",function(request,response){
    let data = request.body; //sacar lo que el cliente envía
    console.log("Credenciales Login");
    console.log(data);

    con.query('SELECT * FROM usuarios WHERE correo = ? AND pass = ?', [data.correo,data.pass], function(error,result,fields){
        var data1= JSON.parse(JSON.stringify(result)) ;
        response.status(200);//Enviar código de status
        if(data1[0]){
            usuario = data.correo;
            console.log(usuario);
            response.send('OK');
            permiso = 1;
        }
        else{
            response.send('NO USER')
        }
    });
});

app.post("/NewRegister",function(request,response){
    let data = request.body; //sacar lo que el cliente envía
    console.log(data);
    con.query('INSERT INTO usuarios (`nombre`,`correo`,`pass`) VALUES (? , ?, ?)', [data.nombre, data.correo, data.pass], function(error,result,fields){
        console.log('REGISTRADO');
        response.send('OK')
        response.status(200);//Enviar código de status  
    });
});

app.post("/NewDataSensor",function(request,response){
    let data = request.body; //sacar lo que el cliente envía
    console.log(data);
    if (data.sensor && data.temp && data.hum){
        con.query('SELECT * FROM sensores WHERE sensor = ?', [data.sensor], function(error,result,fields){
            var data1= JSON.parse(JSON.stringify(result)) ;
            response.status(200);//Enviar código de status
            if(data1[0]){
                con.query('UPDATE sensores SET temp = ? , hum = ? WHERE sensor = ? ', [data.temp, data.hum,data.sensor], function(error,result,fields){
                    console.log('Sensor actualizado');
                    response.send('OK')
                    response.status(200);//Enviar código de status  
                });
            }
            else{
                con.query('INSERT INTO sensores (`sensor`,`temp`,`hum`) VALUES (? , ?, ?)', [data.sensor, data.temp, data.hum], function(error,result,fields){
                    console.log('Sensor registrado');
                    response.send('OK')
                    response.status(200);//Enviar código de status  
                });
            }
        });  
    }
    else{
        response.send('CAMPOS NO COMPLETOS SENSOR')
    }
});

app.post("/NewDataActuator",function(request,response){
    let data = request.body; //sacar lo que el cliente envía
    console.log(data);
    if (data.actuador && data.estado){
        con.query('SELECT * FROM actuadores WHERE actuador = ?', [data.actuador], function(error,result,fields){
            var data1= JSON.parse(JSON.stringify(result)) ;
            response.status(200);//Enviar código de status
            if(data1[0]){
                con.query('UPDATE actuadores SET estado = ? WHERE actuador = ? ', [data.estado, data.actuador], function(error,result,fields){
                    console.log('Actuador actualizado');
                    response.send('OK')
                    response.status(200);//Enviar código de status  
                });
            }
            else{
                con.query('INSERT INTO actuadores (`actuador`,`estado`) VALUES (? , ?)', [data.actuador, data.estado], function(error,result,fields){
                    console.log('Actuador registrado');
                    response.send('OK')
                    response.status(200);//Enviar código de status  
                });
            }
        });  
    }
    else{
        response.send('CAMPOS NO COMPLETOS ACTUADOR')
    }
});


















//Final de código

app.listen(3000,function(){

    console.log("Servidor Iniciado");
});