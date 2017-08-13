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
    feedbacks_model        = require('../../../models/feedbacks'),
    
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
        return user_model.aggregate([
            { $match: {user_type: 'student', status:'active'} },
            { $project : { _id: 1 } }
        ]).exec().then(function(students) {
            var count = 0;
            students.forEach(function(student) {
                new submissions_model({
                    author_id: mongoose.Types.ObjectId(student._id),
                    work_id: mongoose.Types.ObjectId(req.body.work_id),
                    create_date: new Date(),
                    files: []
                }).save();
                count ++;
                if (count === students.length) {
                    return res.sendResponse('done');
                }
            });
        }).catch(function(err) {
            res.requestError(err);
        });
    });

    router.route("/loadSubmissionFiles").post(function(req, res, next) {
        if (req.session_user_type !== 'admin') return res.forbidden();
        var repo_name = "./../" + req.body.repo_path;
        var folder_name = req.body.folder_name;
        var required_files = req.body.required_files.length;
        req.body.required_files.forEach(function(file_name) {
            var count = 0;
            fs.readdir(repo_name, function(err, files) {
                files.forEach(function(utorid) {
                    var file_path = repo_name + '/'+ utorid + '/' + folder_name + '/' + file_name;
                    console.log(file_path);
                    fs.readFile(file_path, 'utf8', function (err, code) {
                        var temp_count = count;
                        return user_model.aggregate([
                            { $match: {'utorid': utorid, status: 'active'} },
                            { $project : { _id: 1 } }
                        ]).exec().then(function(student) {
                            return new submission_files_model({
                                author_id: mongoose.Types.ObjectId(student[0]._id),
                                name: file_name,
                                work_id: mongoose.Types.ObjectId(req.body.work_id),
                                create_date: new Date(),
                                code: code,
                                status: 'active'
                            }).save();
                        }).then(function(ret) {
                            return submissions_model.update(
                                { 'work_id': mongoose.Types.ObjectId(ret.work_id),
                                  'author_id': mongoose.Types.ObjectId(ret.author_id)}, 
                                { $push: {'files': mongoose.Types.ObjectId(ret._id) }
                            }).exec().then(function() {
                                count ++;

                                if (count === files.length) required_files --;
                                console.log(count, files.length, required_files);
                                if (count === files.length && required_files === 0) {
                                    return res.sendResponse('file DONE!');
                                }
                            }).catch(function(err) {
                                res.requestError(err);
                            });
                        });
                    });
                });
            });
        });
    });



    router.route("/distribute").post(function(req, res, next) {
        if (req.session_user_type !== 'admin') return res.forbidden();
        return submission_files_model.aggregate([
            { $match: { 'work_id': mongoose.Types.ObjectId(req.body.work_id) }},
            { $project : { _id: 1, author_id: 1 } }
        ]).exec().then(function(submissions) {
            // SUFFLE  
            var count = 0;
            var len = submissions.length;
            var current_index = len, temp, random_index;
            var num_peers = req.body.num_peers;
            // While there remain elements to shuffle...
            while (0 !== current_index) {
              // Pick a remaining element...
              random_index = Math.floor(Math.random() * current_index);
              current_index -= 1;
              // And swap it with the current element.
              temp = submissions[current_index];
              submissions[current_index] = submissions[random_index];
              submissions[random_index] = temp;
            }

            for (var i = 0; i < len; i ++) {
              for (var j = 1; j <= num_peers; j ++) {

                new feedbacks_model({
                    submission_id: mongoose.Types.ObjectId(submissions[i]._id),
                    author: mongoose.Types.ObjectId(submissions[i].author_id),
                    review_by: mongoose.Types.ObjectId(submissions[(i + j) % len].author_id),
                    feedbacks: [],
                    mark: 0,
                    create_date: new Date(),
                    last_updated: new Date(),
                    status: 'active'
                }).save();
                count ++;
              }
            }

            if (count === len * num_peers) return res.sendResponse(count);
        }).catch(function(err) {
            res.requestError(err);
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
