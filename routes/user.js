'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var router = express.Router();

//Rutas de usuario
router.post('/register',UserController.save);
router.get('/users/:name?',UserController.getUsers);
router.get('/male-users',UserController.getNamePhoneUsers);
router.delete('/user/:userId',UserController.delete);

module.exports = router;
