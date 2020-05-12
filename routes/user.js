'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var router = express.Router();

//Rutas de usuario
router.post('/register',UserController.save);

module.exports = router;
