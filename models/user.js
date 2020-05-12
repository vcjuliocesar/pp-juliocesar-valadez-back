'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name : String,
    phone : String,
    age : Number,
    gender : {
        type:String,
        enum: ["male", "female"]
    },
    created_at : { type: Date, default: Date.now },
});

module.exports = mongoose.model('user',UserSchema);