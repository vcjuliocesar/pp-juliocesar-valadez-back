'use strict'

var common = {
    capital_letter: function (req, res) {
        var str = req.split(" ");

        for (var i = 0; i < str.length; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
        return str.join(" ");
    }
}

module.exports = common;