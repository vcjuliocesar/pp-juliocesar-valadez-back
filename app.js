'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar Express
var app = express();

//Cargar archivos de rutas

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors

//Reescribir rutas

//ruta/metodo de prueba
app.get('/prueba',(req,res) => {
    return res.status(200).send("<h1>Soy el backend</h1>");
});

//Exportar modelo
module.exports = app;