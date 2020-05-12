'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var router = express.Router();

//Rutas de usuario
router.post('/register',UserController.save);
router.get('/users',UserController.getUsers);
router.get('/user/:userId',UserController.getUser);
router.delete('/user/:userId',UserController.delete);

module.exports = router;
