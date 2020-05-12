'use strict'

var validator = require('validator');
//var User = require('');

var controller = {
    
    probando:function(req,res){
        return res.status(200).send({
            message : "Soy el metodo porbando"
        });
    },

    testeando:function(req,res){
        return res.status(200).send({
            message:"Soy el mentodo testeando"
        });
    },

    save: function(req,res){
        //recoger parametros de la peticion
        var params = req.body;
        //validar datos
        var validate_name = !validator.isEmpty(params.name),
            validate_phone = !validator.isEmpty(params.phone) && validator.isMobilePhone(params.phone,['es-MX']),
            validate_age = !validator.isEmpty(params.age) && validator.isInt(params.age,{gt:17,lt:99}),
            validate_gender = !validator.isEmpty(params.gender) && validator.isIn(params.gender,["male", "female"]);

            if(validate_name && validate_phone && validate_age && validate_gender) {
                //crear objeto
                //asignar valores al objeto
                //comprobar si el usuario existe
                //guardarlo
                //respuesta
            } else {
                return res.status(200).send({
                    message: "Error",
                });
            }

       

        return res.status(200).send({
            message: "Registro de usuarios",
            params
        });
    }
};

module.exports = controller;