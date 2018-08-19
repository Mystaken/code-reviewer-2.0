"use strict";

var mongoose = require("mongoose"),
  Promise = require("bluebird"),
  moment = require("moment"),
  config = require("../config/config.json");

/*
 * Returns true iff the given id is valid.
 * @param id {String} The mongo id to be verified.
 */
function validID(id) {
  return id && id.match(/^[0-9a-fA-F]{24}$/);
}

/**
 * Returns the default date if no date provided.
 * @param date {str} Optional. string in the form YYYY-MM-DD
 * Return the Date of date if inputted, otherwise return a default date
 */
function getDefaultDate(date) {
  if (date && moment(date, "YYYY-MM-DD", true)) {
    return new Date(date);
  }
  return moment()
    .add(1, "year")
    .toDate();
}

/**
 * Sets up and connects to mongo.
 * opt.server {str} The location of the server
 * Returns a promise that will resolve on connect.
 */
function setup(opt) {
  mongoose.Promise = Promise;
  mongoose.validID = validID;
  mongoose.getDefaultDate = getDefaultDate;
  return mongoose.connect(
    opt.server,
    opt.opt
  );
}

module.exports = {
  /**
   * Sets up and connects to mongo.
   * opt.server {str} The location of the server
   */
  setup: setup,

  /** Configures the mongoose
   * @param app {Express} the express app
   */
  configure: function(app, opt) {
    // load mongo end point from environment file
    // if it is not found, then load from config file
    return setup({
      server: process.env.MONGO_SERVER || config.mongo.server,
      opt: config.mongo.opt
    });
  }
};
