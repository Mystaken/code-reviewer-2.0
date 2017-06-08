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
    },

    /*
     * Returns true iff date is in the form YYYY-MM-DD
     *
     */
    validDate: function(date) {
        return date && date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    }
};