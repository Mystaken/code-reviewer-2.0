'use strict';
var express     = require('express'),
    kraken      = require('kraken-js'),
    path        = require('path'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),

    config      = require('./config/config.json'),
    API_PORT    = 3000,
    API_DIR     = __dirname,
    APP_DIR     = path.join(__dirname, "../newProject/dist"),
    app         = express(),
    spec        = require('./lib/spec')(app);

app.use(bodyParser.json())
    .use(cookieParser())
    .use(kraken(spec.onconfig))
    .use(express.static(APP_DIR))

app.get('/kenny/', function(res, req, next) {
    return res.sendResponse("EHH");
});

spec.configure();


app.listen(API_PORT, function() {
    console.log("Server started at PORT: " + API_PORT);
});


