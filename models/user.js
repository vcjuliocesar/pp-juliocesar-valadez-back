'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name : String,
    phone : String,
    age : Number,
    gender : String,
    created_at : Date,
});

module.exports = mongoose.model('user',UserSchema);