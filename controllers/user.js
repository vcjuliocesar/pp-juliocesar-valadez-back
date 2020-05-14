'use strict'

//var validator = require('validator');
var validate = require('../helpers/user_validate');
var common = require('../helpers/common');
var User = require('../models/user');


var controller = {

    save: function (req, res) {
        var day = new Date();

        //recoger parametros de la peticion

        var params = req.body;

        //validar datos

        if (validate.validate_data(params)) {

            //crear objeto
            var user = new User();

            //asignar valores al objeto
            user.name = common.capital_letter(params.name);
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
                        message: "Woops, something went wrong",
                        error: err
                    });
                }

                if (!issetUser) {
                    //guardarlo
                    user.save((err, userStored) => {
                        if (err || !userStored) {
                            return res.status(500).send({
                                message: "Woops, something went wrong",
                                error: err
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
                        message: "The user is alredy registered",
                    });
                }
            });

        } else {
            return res.status(200).send({
                message: "Woops, something went wrong,user validate is incorrect",
            });
        }
    },

    getUsers: function (req, res) {
        var name = req.params.name;
        var query = User.find();
        if (name) {
            query = User.find({
                name: {
                    $regex: name,
                    $options: "$i"
                }
            });

        }
        query.exec((err, users) => {
            if (err || !users) {
                return res.status(404).send({
                    status: "fail",
                    message: "something went wrong",
                    error: err
                });
            }
            return res.status(200).send({
                status: "success",
                users
            });
        });

    },

    getNamePhoneUsers: function (req, res) {
        var today = new Date();
        var d = new Date();
        d.setTime(d.getTime() - (4 * 24 * 60 * 60 * 1000));
        User.find({
            gender: 'male',
            age: {
                $gt: 18
            },
            created_at: {
                $gte: d,
                $lt: today
            }
        }, {
            name: 1,
            phone: 1
        }).exec((error, users) => {
            if (error || !users) {
                return res.status(500).send({
                    status: "fail",
                    message: "something went wrong"
                });
            }

            return res.status(200).send({
                status: 'success',
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
                    message: "something went wrong",
                    error: err
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