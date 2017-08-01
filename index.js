var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var validation = require('./validation/wms.validation.js')();
var data = require('./data.js');

app.use(bodyParser.json())


app.get('/wms', function (req, res) {
    if (!data) {
        res.sendStatus(500);
    } else if (data.length == 0) {
        res.sendStatus(204);
    } else {
        res.json(data);
    }
});

app.post('/wms', validation.wmsValidation, function (req, res) {
    data = data.concat(req.body.wms);
    res.status(200).json(data);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});