'use strict';

var express      = require('express'),
    kraken       = require('kraken-js'),
    path         = require('path'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger       = require('./lib/logger'),
    cors         = require('cors'),

    config      = require('./config/config.json'),
    API_PORT    = 3000,
    API_DIR     = __dirname,
    APP_DIR     = path.join(__dirname, "../angular-front-end/dist"),
    app         = express(),
    spec        = require('./lib/spec')(app);

function validateArgs() {
    var args = process.argv.slice(2),
        ret  = {};

    ret.enviroment = args[args.indexOf('--env') + 1];

    if (ret.enviroment) {
        if (ret.enviroment !== 'production' || ret.enviroment !== 'development') {
            logger.fatal('Environment can only be set to \'production\' or \'development\'.');
            ret.error = true;
        }
    } else {
        logger.warn('No environment set. Defaulting to \'development\'');
        ret.enviroment = 'development';
    }
    return ret;
}

function startApp() {
    var args = validateArgs();
    if (args.error) {
        return;
    }

    app.use(bodyParser.json())
        .use(cookieParser())
        .use(kraken(spec.onconfig))
        .use(express.static(APP_DIR))
        .use(cors()); //REMOVE THIS LATER.

    spec.configure({
        enviroment: args.enviroment
    });


    app.listen(API_PORT, function() {
        logger.info("Server started at PORT: " + API_PORT);
    });
}


startApp();
