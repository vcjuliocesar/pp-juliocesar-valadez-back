'use strict'

var validator = require('validator');

var validate = {
    validate_data: function (req, res) {
        var params = req;
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
                message: "something was wrong"
            });
        }

        if (validate_name && validate_phone && validate_age && validate_gender) {
            return true;
        }

        return false;
    }
};

module.exports = validate;