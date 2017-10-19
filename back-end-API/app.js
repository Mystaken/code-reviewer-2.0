'use strict';

var express      = require('express'),
    kraken       = require('kraken-js'),
    path         = require('path'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger       = require('./lib/logger'),
    cors         = require('cors'),
    expressJwt   = require('express-jwt'),
    jwt          = require('jsonwebtoken'),
    unless       = require('express-unless'),

    config      = require('./config/config.json'),
    API_PORT    = 3000,
    API_DIR     = __dirname,
    APP_DIR     = path.join(__dirname, '../angular-front-end/dist'),
    app         = express(),
    spec        = require('./lib/spec')(app);

function validateArgs() {
    var args = process.argv.slice(2),
        ret  = {},
        valid_user_types = [ 'admin' , 'ta', 'student'],
        params = {
            env: {
                name: '--env'
            },
            user_id: {
                name: '--user_id'
            },
            user_type: {
                name: '--user_type'
            }
        };

    ret = {
        environment: 'development',
        user_id: '597454be305f03346c012275',
        user_type: 'admin'
    }
    if (args.indexOf(params.env.name) > 0) {
        ret.environment = args[args.indexOf(params.env.name) + 1];
        if (ret.environment !== 'production' || ret.environment !== 'development') {
            logger.fatal('Environment can only be set to \'production\' or \'development\'.');
            ret.error = true;
            return ret;
        }
    } else {
        logger.warn('No environment set. Defaulting to \'development\'.');
    }
    if (ret.environment === 'development') {
        if (args.indexOf(params.user_id.name) >= 0) {
            ret.user_id = args[args.indexOf(params.user_id.name) + 1];
            logger.debug('Setting login user to: ' + ret.user_id);
        } else {
            logger.debug('No user_id inputted. Using default user_id: ' + ret.user_id);
        }
        if (args.indexOf(params.user_type.name) >= 0) {
            ret.user_type = args[args.indexOf(params.user_type.name) + 1];
            if (valid_user_types.indexOf(ret.user_type) < 0) {
                logger.fatal('Invalid user type.');
                ret.error = true;
                return;
            }
            logger.debug('Setting login user type to: ' + ret.user_type);
        } else {
            logger.debug('No user_type inputted. Defaulting to \'Administrator\'');
        }
    }
    return ret;
}

function startApp() {
    var opt;
    logger.setup();
    opt = validateArgs();
    if (opt.error) {
        return;
    }
    logger.setup();

    var myJwt = expressJwt({
        secret: "a temporary secret"
    }).unless({
        path: ['/', '/login', '/api']
    });

    app.use(bodyParser.json())
        .use(cookieParser())
        .use(kraken(spec.onconfig))
        .use(express.static(APP_DIR))
        .use(cors()) //REMOVE THIS LATER.
        .use(myJwt);

    // login route
    app.get('/login', function(req, res) {
        res.send("accessible");
    })

    return spec.configure(opt).then(function() {
        return app.listen(API_PORT, function() {
            logger.info(config.app.name + ' started at PORT: ' + API_PORT);
        });    
    }).catch(function(err) {
        logger.fatal(err);
    });

}

startApp();
