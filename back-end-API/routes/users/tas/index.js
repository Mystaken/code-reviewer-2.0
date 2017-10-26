'use strict';

var validator   = require('../../../lib/validator'),
    sanitizer   = require('../../../lib/sanitizer'),
    utils       = require('../../../lib/utils'),
    mongoose    = require('mongoose'),
    Promise     = require('bluebird'),

    user_model      = require('../../../models/users'),

    ta_get_schema      = require('../../../schemas/users/tas/tas_get'),
    ta_put_schema      = require('../../../schemas/users/tas/tas_put'),
    ta_delete_schema   = require('../../../schemas/users/tas/tas_delete'),
    ta_post_schema     = require('../../../schemas/users/tas/tas_post'),
    ta_all_get_schema  = require('../../../schemas/users/tas/tas_all_get');

module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
        var error;

        validator.validate(req.query, ta_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        if (!mongoose.validID(req.query.user_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
        // prevent a TA accessing an other TA’s data
        if (req.session_user_type === 'ta' &&
            req.session_user_id !== req.query.user_id) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
        return user_model.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.query.user_id),
                        user_type: 'ta',
                        status: 'active'
                    }
                },{
                    $project: {
                        user_id: "$_id",
                        _id: 0,
                        contract_number: 1,
                        first_name: 1,
                        last_name: 1,
                        utorid: 1,
                        email: 1,
                        last_login: { 
                            $dateToString: { 
                                format: "%Y-%m-%d %H:%M:%S", 
                                date: "$last_login" 
                            }
                        }
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'user_id' ]
                    });
                }
                return res.sendResponse(ret[0]);
            }).catch(function(err) {
                return res.requestError(err);
            });

  // put(route, params) {
  //   params = params || {};
  //   return this._http.put(this._api_route + route, params)
  //       .map(res => res.json().data)
  //       .catch(this._parseError);
  // }

    }).put(function (req, res, next) {
        console.log(req)
        var error;
        if (req.session_user_type !== 'admin') {
            return res.forbidden();
        }
        validator.validate(req.body, ta_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        // checking if user exists by checking their utorid and email
        return user_model.aggregate([
                {
                    $match: {
                        $or: [
                            { utorid: req.body.utorid },
                            { email: req.body.email }
                        ]
                    }
                }
            ]).exec().then(function(ret) {
                // if there exists a user with the same email or utorid
                if (ret.length) {
                    return Promise.reject({
                        code: "EXISTS",
                        params: [ 'email', "utorid" ]
                    });
                }
                // create new user
                return new user_model({
                    first_name:     req.body.first_name,
                    last_name:      req.body.last_name,
                    email:          req.body.email,
                    utorid:         req.body.utorid,
                    contract_number: req.body.contract_number,
                    last_login:     new Date(),
                    user_type:      'ta',
                    status:         'active'
                }).save();
            }).then(function(ret) {
                res.sendResponse(ret._id);
            }).catch(function(err) {
                return res.requestError(err);
            });

    }).post(function (req, res, next) {
        console.log(req)
        var error,
            query,
            update_query;
        // only admin and ta can post to api/tas
        if (req.session_user_type !== 'admin' &&
            req.session_user_type !== 'ta') {
            return res.forbidden();
        }
        // no TA can access other TA's information
        if (req.session_user_type === 'ta' &&
            req.session_user_id !== req.query.user_id) {
          return res.requestError({
              code: 'NOT_FOUND',
              params: [ 'user_id' ]
          });
        }
        // validation
        validator.validate(req.body, ta_post_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: 'VALIDATION', message: error });
        }
        // this TA with user_id does not exists in db
        if (!mongoose.validID(req.body.user_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'user_id' ]
            });
        }
        // only active TA can make request
        query = {
            _id: mongoose.Types.ObjectId(req.body.user_id),
            user_type: 'ta',
            status: 'active'
        };
        update_query = utils.clean({
            first_name: req.body.first_name,
            last_name:  req.body.last_name,
            status: 'active'
        });
        return user_model.find(query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'user_id' ]
                    });
            }
            return user_model.findOneAndUpdate(query, update_query)
                .exec();
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });

    }).delete(function (req, res, next) {
        var error,
            query;
        if (req.session_user_type !== 'admin') {
            return res.requestError({
                code: 'NOT_FOUND',
                params: [ 'user_id' ]
            });
        }
        validator.validate(req.body, ta_delete_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            _id: mongoose.Types.ObjectId(req.body.user_id),
            user_type: 'ta'
        };
        return user_model.find(query).exec().then(function(ret) {
            if (!ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'user_id' ]
                    });
            }
            return user_model.findOneAndUpdate(query, {
                    status: 'inactive'
                }).exec();
        }).then(function(ret) {
            res.sendResponse(ret._id);
        }).catch(function (err) {
            res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });

    router.route('/all').get(function(req, res, next) {
        var error,
            query;
        if (req.session_user_type !== 'admin') {
            return res.forbidden();
        }
        if (req.query.contract_number) {
            req.query.contract_number = sanitizer.sanitize(req.query.contract_number,
                'stringToInteger');
        }
        validator.validate(req.query, ta_all_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            email:      req.query.email,
            first_name: req.query.first_name,
            last_name:  req.query.last_name,
            utorid:     req.query.utorid,
            status:     req.query.status,
            user_type:  'ta',
            contract_number: req.query.contract_number
        };
        if (req.query.user_id) {
            if (!mongoose.validID(req.query.user_id)) {
                return res.sendResponse([]);
            }
            query._id = mongoose.Types.ObjectId(req.query.user_id);
        }
        utils.clean(query);
        return user_model.aggregate([
            { $match: query },
            { $project : {
                user_id: "$_id",
                _id: 0,
                email: 1,
                first_name: 1,
                last_name: 1,
                utorid: 1,
                status: 1,
                contract_number: 1,
                last_login: { 
                    $dateToString: { 
                        format: "%Y-%m-%d %H:%M:%S", 
                        date: "$last_login" 
                    }
                }
            }
        }
        ]).exec().then(function(ret) {
            return res.sendResponse(ret);
        }).catch(function(err) {
            res.requestError(err);
        });
    }).all(function(req, res, next) {
        return res.invalidVerb();
    });
};
