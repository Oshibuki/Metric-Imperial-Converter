/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

    var convertHandler = new ConvertHandler();

    app.route('/api/convert')
        .get(function (req, res) {
            var input = req.query.input;
            var initNum = convertHandler.getNum(input);
            var initUnit = convertHandler.getUnit(input);
            var returnNum = convertHandler.convert(initNum, initUnit);
            var returnUnit = convertHandler.getReturnUnit(initUnit);
            var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

            var invalid = {
                initNum: false,
                initUnit: false
            }
            if (Number.isNaN(initNum)) {
                invalid.initNum = true
            }
            if (initUnit === "invalid") {
                invalid.initUnit = true
            }
            var invalidInfo;
            if (invalid.initUnit && invalid.initNum) {
                invalidInfo = "invalid number and unit"
            } else {
                if (invalid.initNum) {
                    invalidInfo = 'invalid number'
                }
                if (invalid.initUnit) {
                    invalidInfo = "invalid unit"
                }
            }
            if (invalidInfo) {
                res.status(200).send(invalidInfo).end();
            } else {
                res.json({
                    initNum: initNum,
                    initUnit: initUnit,
                    returnNum: returnNum,
                    returnUnit: returnUnit,
                    string: toString
                })
            }


        });

};
