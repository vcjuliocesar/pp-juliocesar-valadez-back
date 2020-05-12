'use strict'

var validator = require('validator');
var moment = require('moment');
var User = require('../models/user');

var controller = {

    save: function (req, res) {
        //recoger parametros de la peticion
        var params = req.body;
        //validar datos
        try {
            var validate_name = !validator.isEmpty(params.name),
                validate_phone = !validator.isEmpty(params.phone) && validator.isMobilePhone(params.phone, ['es-MX']),
                validate_age = !validator.isEmpty(params.age) && validator.isInt(params.age, {
                    gt: 17,
                    lt: 99
                }),
                validate_gender = !validator.isEmpty(params.gender) && validator.isIn(params.gender, ["male", "female"]);
        } catch (err) {
            return res.status(500).send({
                message: "algo salio mal"
            });
        }


        if (validate_name && validate_phone && validate_age && validate_gender) {
            //crear objeto
            var user = new User();
            var day = new Date();
            //asignar valores al objeto
            user.name = params.name.toLowerCase();
            user.phone = params.phone;
            user.age = params.age;
            user.gender = params.gender.toLowerCase();
            user.created_at = day;

            //comprobar si el usuario existe
            User.findOne({
                name: user.name,
                phone: user.phone
            }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de usuario",
                    });
                }

                if (!issetUser) {
                    //guardarlo
                    user.save((err, userStored) => {
                        if (err || !userStored) {
                            return res.status(500).send({
                                message: "Error al guardar el usuario"
                            });
                        }
                        //respuesta
                        return res.status(200).send({
                            message: "success",
                            user: userStored
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

    getUsers: function (req, res) {
        var name = req.params.name;
        var query = User.find();
        if (name) {
            query = User.find({
                name: {
                    $regex: name
                }
            });

        }
        query.exec((err, users) => {
            if (err || !users) {
                return res.status(404).send({
                    status: "fail",
                    message: "No hay usuarios"
                });
            }
            return res.status(200).send({
                status: "success",
                users
            });
        });

    },

    getUser: function (req, res) {
        var userId = req.params.userId;

        User.findById(userId).exec((err, user) => {
            if (err || !user) {
                return res.status(404).send({
                    status: "fail",
                    message: "No hay usuario"
                });
            }
            return res.status(200).send({
                status: "success",
                user
            });
        });
    },

    getNamePhoneUsers: function(req,res){
        var today = new Date();
        var d = new Date();
        d.setTime(d.getTime() - (4 * 24*60*60*1000));
        User.find({gender:'male',age:{$gt:18},created_at:{ $gte: d,$lt: today}},{name:1,phone:1}).exec((error,users) => {
            if(error || !users){
                return res.status(500).send({
                    status:"fail",
                    message:"something was wrong"
                });
            }

            return res.status(200).send({
                status:'success',
                users
            });
        });    
    },

    delete: function (req, res) {
        var userId = req.params.userId;
        User.findByIdAndRemove(userId).exec((err, user) => {
            if (err || !user) {
                return res.status(404).send({
                    status: "fail",
                    message: "error al borrar"
                });
            }
            res.status(200).send({
                status: "success",
                message: "Delete success"
            });
        });
    },
};

module.exports = controller;