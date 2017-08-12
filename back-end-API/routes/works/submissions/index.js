'use strict';

var validator = require('../../../lib/validator'),
    utils     = require('../../../lib/utils'),
    reader    = require('../../../lib/reader'),
    mongoose  = require('mongoose'),
    Promise   = require('bluebird'),
    fs        = require('fs'),

    submission_files_model = require('../../../models/submission_files'),
    submissions_model      = require('../../../models/submissions'),
    works_model            = require('../../../models/works'),
    user_model             = require('../../../models/users'),
    
    submissions_get_schema = require('../../../schemas/works/submissions/submissions_get'),
    submissions_put_schema = require('../../../schemas/works/submissions/submissions_put'),
    submissions_all_get_schema = require('../../../schemas/works/submissions/submissions_all_get'),
    submission_files_get_schema    = require('../../../schemas/works/submissions/submission_files_get'),
    submission_files_delete_schema = require('../../../schemas/works/submissions/submission_files_delete'),
    submission_files_put_schema    = require('../../../schemas/works/submissions/submission_files_put'),
    submission_files_upload_schema = require('../../../schemas/works/submissions/submission_files_upload'),
    student_all_get_schema  = require('../../../schemas/users/students/students_all_get');




module.exports = function (router) {
    router.route('/').get(function(req, res, next) {
        var error;
        if (!mongoose.validID(req.query.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        validator.validate(req.query, submissions_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return submissions_model.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.query.submission_id),
                    author_id: mongoose.Types.ObjectId(req.session_user_id)
                }
            },{
                $project: {
                    submission_id: "$_id",
                    _id: 0,
                    files: 1,
                    author_id: 1,
                    work_id: 1,
                    create_date: { 
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
                        params: [ 'submission_id' ]
                    });
            }
            return res.sendResponse(ret[0]);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).put(function(req, res, next) {
        var error;
        if (!mongoose.validID(req.body.work_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'work_id' ]
            });
        }
        validator.validate(req.body, submissions_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        return works_model.aggregate([
            {
                $match: {
                    status: 'active',
                    _id: mongoose.Types.ObjectId(req.body.work_id)
                }   
            }
        ]).exec().then(function(ret) {
            if (!ret || !ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'work_id' ]
                    });
            }
            return submissions_model.aggregate([
                {
                    $match: {
                        author_id: mongoose.Types.ObjectId(req.session_user_id),
                        work_id: mongoose.Types.ObjectId(req.body.work_id)
                    }   
                }
            ]).exec();
        }).then(function (ret) {
            if (ret && ret.length) {
                return Promise.reject({
                        code: "EXISTS",
                        params: [ 'submission_id' ]
                    });
            }
            return new submissions_model({
                author_id: req.session_user_id,
                work_id: req.body.work_id,
                create_date: new Date(),
                files: []
            }).save();
        }).then(function(ret) {
            return res.sendResponse(ret._id);
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });


    router.route("/all").get(function(req, res, next) {
        var error;
        validator.validate(req.body, submissions_all_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        var query = {}
        if (req.query.work_id) query.work_id = mongoose.Types.ObjectId(req.query.work_id);
        if (req.query.user_id) query.author_id = mongoose.Types.ObjectId(req.query.user_id);

        return submissions_model.aggregate([
            {
                $match: query
            },{
                $project: {
                    submission_id: "$_id",
                    _id: 0,
                    files: 1,
                    author_id: 1,
                    work_id: 1,
                    create_date: { 
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
                        params: [ 'submission_id' ]
                    });
            }
            return res.sendResponse(ret);
        }).catch(function(err) {
            return res.requestError(err);
        });
    });

    router.route("/loadSubmissions").post(function(req, res, next) {
        if (req.session_user_type !== 'admin') return res.forbidden();
        console.log(req.body);
        var repo_path = "./../" + req.body.repo_path;
        var file_name = req.body.required_files[0];
        fs.readdir(repo_path, function(err, files) {
            var count = 1;
            files.forEach(function(utorid) {
                var file_path = repo_path + '/'+ utorid + '/a2/' + file_name;
                fs.readFile(file_path, 'utf8', function (err, code) {
                    var temp_count = count;
                    return user_model.aggregate([
                        { $match: {'utorid': utorid, status: 'active'} },
                        { $project : { user_id: "$_id", _id: 0 } }
                    ]).exec().then(function(student) {
                        return new submission_files_model({
                            author_id: student[0].user_id,
                            name: file_name,
                            work_id: req.body.work_id,
                            create_date: new Date(),
                            code: code,
                            status: 'active'
                        }).save();
                    }).then(function(ret) { // no need to check if work or submission exist.
                        return new submissions_model({
                            author_id: req.session_user_id,
                            work_id: req.body.work_id,
                            create_date: new Date(),
                            files: [ret._id]
                        }).save();
                    }).then(function(ret) {
                        console.log("DONE!!!!", ret.files, temp_count);
                        if (temp_count === files.length) return res.sendResponse(ret);
                    }).catch(function(err) {
                        console.log("NOPPEEE");
                        res.requestError(err);
                    });
                    // console.log(code);
                    // // codes.push(data);
                    // count++;
                    //  if(count === files.length) {
                    //     console.log("**************************************************");
                    //     console.log("**************************************************");
                    //     console.log("**************************************************");
                    //     console.log("**************************************************");
                    //      return res.sendResponse({
                    // // //         'utorids': files,
                    // // //         'codes': codes
                    //      })
                    //  }
                });
            });
        });
    });

    


    router.route('/files').get(function(req, res, next) {
        var error;

        if (!mongoose.validID(req.query.submission_file_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_file_id' ]
            });
        }
        validator.validate(req.query, submission_files_get_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        return submission_files_model.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.query.submission_file_id),
                        status: 'active',
                        author_id: mongoose.Types.ObjectId(req.session_user_id)
                    }
                },{
                    $project: {
                        submission_file_id: "$_id",
                        name: 1,
                        work_id: 1,
                        author_id: 1,
                        code: 1
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length || (ret.author_id !== req.session_user_id &&
                    req.session_user_type !== 'admin')) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_file_id' ]
                    });
                }
                return res.sendResponse(ret[0]);
            }).catch(function(err) {
                return res.requestError(err);
            });
    }).delete(function (req, res, next) {
        var error,
            query;

        if (!mongoose.validID(req.body.submission_file_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_file_id' ]
            });
        }
        validator.validate(req.body, submission_files_delete_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }

        query = {
            _id: mongoose.Types.ObjectId(req.body.submission_file_id),
            status: 'active'
        };
        return submission_files_model.aggregate([
                {
                    $match: query
                },{
                    $project: {
                        submission_file_id: "$_id",
                        _id: 0,
                        work_id: 1,
                        author_id: 1,
                        code: 1
                    }
                }
            ]).exec().then(function(ret) {
                if (!ret || !ret.length || (ret.author_id !== req.session_user_id &&
                    req.session_user_type !== 'admin')) {
                    return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_file_id' ]
                    });
                }
                return submission_files_model.findOneAndUpdate(query, {
                        status: 'inactive',
                        delete_date: new Date()
                    }).exec();
            }).then(function(ret) {
                res.sendResponse(ret._id);
            }).catch(function(err) {
                return res.requestError(err);
            });
    }).put(function(req, res, next) {
        var error,
            query,
            submission_old;
        if (!mongoose.validID(req.body.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }

        validator.validate(req.body, submission_files_put_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            _id: mongoose.Types.ObjectId(req.body.submission_id)
        };
        return submissions_model.aggregate([
            { $match: query }
        ]).exec().then(function(ret) {
            if (!ret || !ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
            }
            submission_old = ret[0];
            return new submission_files_model({
                author_id: req.session_user_id,
                name: req.body.name,
                work_id: ret[0].work_id,
                create_date: new Date(),
                code: req.body.content,
                status: 'active'
            }).save();
        }).then(function(ret) {
            submission_old.files.push(ret._id);
            return submissions_model.findOneAndUpdate(query, {
                files: submission_old.files,
            }).exec().then(function() {
                return res.sendResponse(ret._id);
            });
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).post(function(req, res, next) {
        var error,
            query,
            file = req.files.submission,
            submission_old;
        // validations
        if (!mongoose.validID(req.body.submission_id)) {
            return res.requestError({
                code: "NOT_FOUND",
                params: [ 'submission_id' ]
            });
        }
        error = validator.validFile({
            file: file,
            name: 'submission'
        });
        if (error) {
            return res.requestError({ code: 'VALIDATION', message: error });
        }
        validator.validate(req.body, submission_files_upload_schema);
        error = validator.getLastErrors();
        if (error) {
            return res.requestError({ code: "VALIDATION", message: error });
        }
        query = {
            _id: mongoose.Types.ObjectId(req.body.submission_id)
        };
        return submissions_model.aggregate([{ 
            $match: query 
        }]).exec().then(function(ret) {
            if (!ret || !ret.length) {
                return Promise.reject({
                        code: "NOT_FOUND",
                        params: [ 'submission_id' ]
                    });
            }
            submission_old = ret[0];
            return reader.readFileAsync(file.path);
        }).then(function(ret) {
            return new submission_files_model({
                author_id: req.session_user_id,
                name: req.body.name,
                work_id: submission_old.work_id,
                create_date: new Date(),
                code: ret,
                status: 'active'
            }).save();
        }).then(function(ret) {
            submission_old.files.push(ret._id);
            return submissions_model.findOneAndUpdate(query, {
                    files: submission_old.files,
                }).exec().then(function() {
                    return utils.promiseRemoveFile(file.path);
                }).then(function() {
                    return res.sendResponse(ret._id);
                });
        }).catch(function(err) {
            return res.requestError(err);
        });
    }).all(function (req, res, next) {
        return res.invalidVerb();
    });
};
