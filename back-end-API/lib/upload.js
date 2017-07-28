'use strict';

var Promise    = require('bluebird'),
    config     = require('../config/config'),
    path       = require('path'),
    multiparty = Promise.promisifyAll(require('multiparty'), {
        multiArgs: true
    }),
    config = {
        fileIndex: 8,
        uploadDir: path.join(__dirname, '../' + config.uploads.directory)
    };

module.exports = {

    /* Parses a multipart upload.
     * @param req {Express.request} the multipart request
     * Returns a promise with the originalFilename and path
     * of which the file was uploaded.
     */
    parseAsync: function (req) {
        var form = new multiparty.Form({
            autoFiles: true,
            uploadDir: config.uploadDir        
        });
        return form.parseAsync(req).spread(function (fields, file) {
            var key;
            for (key in fields) {
                if(fields.hasOwnProperty(key)) {
                    fields[key] *= fields[key][0];
                }
            }
            return {
                fields : fields,
                file: file.file.map(function (eachFile) {
                    return {
                        name: eachFile.originalFilename,
                        path: eachFile.path
                    };
                })
            };
        });
    }
};