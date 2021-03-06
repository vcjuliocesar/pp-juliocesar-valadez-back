'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3999;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_node',{useNewUrlParser:true,useUnifiedTopology: true})
        .then(()=>{
            console.log("connection success");
            //crear el servidor
            app.listen(port,()=>{
                console.log("server running");
            });
        }).catch((error)=>{
            console.log(error);
        });