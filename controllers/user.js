'use strict'

var validator = require('validator');
var moment = require('moment');
var User = require('../models/user');

var controller = {

    save: function (req, res) {
        //recoger parametros de la peticion
        var params = req.body;
        //validar datos
        var validate_name = !validator.isEmpty(params.name),
            validate_phone = !validator.isEmpty(params.phone) && validator.isMobilePhone(params.phone, ['es-MX']),
            validate_age = !validator.isEmpty(params.age) && validator.isInt(params.age, {
                gt: 17,
                lt: 99
            }),
            validate_gender = !validator.isEmpty(params.gender) && validator.isIn(params.gender.toLowerCase(), ["male", "female"]);

        if (validate_name && validate_phone && validate_age && validate_gender) {
            //crear objeto
            var user = new User();

            //asignar valores al objeto
            user.name = params.name;
            user.phone = params.phone;
            user.age = params.age;
            user.gender = params.gender;
            user.created_at = moment().format();
        
            //comprobar si el usuario existe
            User.findOne({
                name: user.name
            }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de usuario",
                    });
                }

                if (!issetUser) {
                    //guardarlo
                    user.save((err, userStored) => {
                        if(err) {
                            return res.status(500).send({
                                message: "Error al guardar el usuario"
                            });
                        }

                        if(!userStored){
                            return res.status(400).send({
                                message:"El usuario no se guardo"
                            });
                        }
                        //respuesta
                        return res.status(200).send({
                            message:"success",
                            user:userStored
                        });
                    });
            
                } else {
                    return res.status(200).send({
                        message: "El usuario ya esta registrado",
                    });
                }
            });

        } else {
            return res.status(200).send({
                message: "Validación de los datos del usuario incorrecta",
            });
        }
    },
};

module.exports = controller;