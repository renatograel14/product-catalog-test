
var _ = require('lodash');
var nodeValidator = require('node-validator');
var validator = require('validator');

module.exports = function () {
    var validation = {};

    this.wmsValidateField = function (item, callback) {


        var productImageValidator = (value, onError) => {
            var field = value.product_image_url
            var notNull = field;
            var isString = typeof field == 'string';
            var isURL = validator.isURL(field);
            var imageExtention = () => {
                var ext = field.match(/\.(.*)/);
                return _.indexOf(['jpg', 'jpeg', 'png', 'gif'], ext ? ext[1] : "") > -1;
            }
            var valid = notNull && isString && (isURL || imageExtention());

            if (!valid) {
                onError("Image URL not valid or extension not allow (valid ext: 'jpg', 'jpeg', 'png', 'gif')", 'product_image_url', field);
            }
        };

        function isFloat() {
            return {
                validate: validate
            };

            function validate(value, onError) {
                if (value === null || value === undefined) {
                    return onError('Required value.');
                }
                if (!validator.isFloat(value)) {
                    return onError('Incorrect type. Expected number.');
                } 
                return null;
            }
        }

        var check = nodeValidator.isObject()
            .withRequired('sku', nodeValidator.isString())
            .withRequired('price', isFloat())
            .withRequired('name', nodeValidator.isString())
            .withRequired('description', nodeValidator.isString())
            .withRequired('size', nodeValidator.isArray())
            .withRequired('brand', nodeValidator.isString())
            .withRequired('categories', nodeValidator.isArray())
            .withRequired('product_image_url', nodeValidator.isString())
            .withOptional('special_price', nodeValidator.isNumber())
            .withCustom(productImageValidator)



        nodeValidator.run(check, item, callback);

    }


    validation.wmsValidation = function (req, res, next) {
        var body = req.body;
        var errors = [];
        if (_.isEmpty(body)) {
            var err = 'no data recieved'
            res.status(400).send(err);
        }


        if (body.wms instanceof Array) {
            let array = body.wms;
            array.forEach(item => this.wmsValidateField(item, (count, err) => {
                if (err.length > 0) {
                    errors = errors.concat(err);
                }
            }));
        } else {
            this.wmsValidateField(body.wms, (count, err) => {
                if (err.length > 0) {
                    errors = errors.concat(err);
                    console.log(errors);

                }
            })
        }
        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            next();
        }

    }

    return validation;
}