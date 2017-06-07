'use strict';

module.exports = {
    /*
     * Removes all blank attributes from object.
     * @param obj {Object} The object to be cleaned.
     */
    clean: function(obj) {
        for (var item in obj) { 
            if (obj[item] === null || obj[item] === undefined) {
                delete obj[item];
            }
        }
        return obj;
    }
};